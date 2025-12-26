import { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import SectionTree from '@/Components/SectionTree';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Editor({ book, sections, canManage }) {
    const [selectedSection, setSelectedSection] = useState(null);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [showCollaborators, setShowCollaborators] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { data, setData, put, processing } = useForm({
        title: selectedSection?.title || '',
        content: selectedSection?.content || '',
    });

    const collaboratorForm = useForm({
        email: '',
    });

    useEffect(() => {
        if (selectedSection) {
            setData({
                title: selectedSection.title,
                content: selectedSection.content || '',
            });
        }
    }, [selectedSection]);

    const handleSelectSection = (section) => {
        setSelectedSection(section);
    };

    const handleSaveSection = () => {
        if (!selectedSection) return;
        put(route('sections.update', selectedSection.id), {
            preserveScroll: true,
        });
    };

    const handleAddRootSection = (e) => {
        e.preventDefault();
        if (!newSectionTitle.trim()) return;

        router.post(
            route('sections.store', book.id),
            { title: newSectionTitle, parent_id: null },
            {
                onSuccess: () => setNewSectionTitle(''),
            }
        );
    };

    const handleAddCollaborator = (e) => {
        e.preventDefault();
        collaboratorForm.post(route('collaborators.store', book.id), {
            onSuccess: () => collaboratorForm.reset(),
        });
    };

    const handleRemoveCollaborator = (userId) => {
        if (confirm('Remove this collaborator?')) {
            router.delete(route('collaborators.destroy', [book.id, userId]));
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <Head title={book.title} />

            <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('books.index')}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h1 className="text-sm font-semibold text-gray-900">{book.title}</h1>
                            <p className="text-xs text-gray-500">
                                {canManage ? 'Author' : 'Collaborator'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {canManage && (
                        <button
                            type="button"
                            onClick={() => setShowCollaborators(!showCollaborators)}
                            className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                        >
                            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            Share
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                </div>
            </header>

            {showCollaborators && canManage && (
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="mx-auto max-w-2xl">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">Share with collaborators</h3>
                        <form onSubmit={handleAddCollaborator} className="mb-3 flex">
                            <input
                                type="email"
                                value={collaboratorForm.data.email}
                                onChange={(e) => collaboratorForm.setData('email', e.target.value)}
                                placeholder="Enter email address"
                                className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={collaboratorForm.processing}
                                className="rounded-r-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Invite
                            </button>
                        </form>
                        {collaboratorForm.errors.email && (
                            <p className="mb-2 text-sm text-red-600">{collaboratorForm.errors.email}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {book.collaborators?.map((collab) => (
                                <span key={collab.id} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm shadow-sm">
                                    <span className="mr-1 h-2 w-2 rounded-full bg-green-400"></span>
                                    {collab.name}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCollaborator(collab.id)}
                                        className="ml-2 text-gray-400 hover:text-red-600"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                {sidebarOpen && (
                    <aside className="w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
                        <div className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-700">Contents</h2>
                            </div>

                            {canManage && (
                                <form onSubmit={handleAddRootSection} className="mb-4">
                                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={newSectionTitle}
                                            onChange={(e) => setNewSectionTitle(e.target.value)}
                                            placeholder="Add section..."
                                            className="ml-2 flex-1 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                </form>
                            )}

                            <SectionTree
                                sections={sections}
                                bookId={book.id}
                                canManage={canManage}
                                onSelectSection={handleSelectSection}
                                selectedSectionId={selectedSection?.id}
                            />

                            {sections.length === 0 && (
                                <p className="text-center text-sm text-gray-400">
                                    {canManage ? 'Add your first section above' : 'No sections yet'}
                                </p>
                            )}
                        </div>
                    </aside>
                )}

                <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
                    <div className="mx-auto max-w-3xl">
                        {selectedSection ? (
                            <div className="min-h-[600px] rounded-lg bg-white p-8 shadow-sm">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mb-6 w-full border-0 border-b border-transparent p-0 text-2xl font-bold text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-0"
                                    placeholder="Section title"
                                />

                                <RichTextEditor
                                    content={data.content}
                                    onUpdate={(html) => setData('content', html)}
                                />

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSaveSection}
                                        disabled={processing}
                                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-white p-8 shadow-sm">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Select a section</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Choose a section from the sidebar to start editing
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
