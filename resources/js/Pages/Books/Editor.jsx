import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import SectionTree from '@/Components/SectionTree';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Editor({ book, sections, canEdit, canManage }) {
    const [selectedSection, setSelectedSection] = useState(null);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [showShare, setShowShare] = useState(false);

    const { data, setData, put, processing } = useForm({
        title: '',
        content: '',
    });

    const collaboratorForm = useForm({ email: '' });
    const bookTitleForm = useForm({
        title: book.title,
    });
    const [isRenamingBook, setIsRenamingBook] = useState(false);

    const handleSelectSection = (section) => {
        setSelectedSection(section);
        setData({ title: section.title, content: section.content || '' });
    };

    const handleSave = () => {
        if (!selectedSection) return;
        put(route('sections.update', selectedSection.id), { preserveScroll: true });
    };

    const handleAddSection = (e) => {
        e.preventDefault();
        if (!newSectionTitle.trim()) return;
        router.post(route('sections.store', book.id), { title: newSectionTitle, parent_id: null }, {
            onSuccess: () => setNewSectionTitle(''),
        });
    };

    const handleInvite = (e) => {
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

    const handleUpdateBookTitle = (e) => {
        e.preventDefault();
        bookTitleForm.put(route('books.update', book.id), {
            onSuccess: () => setIsRenamingBook(false),
        });
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <Head title={book.title} />

            <header className="flex h-12 items-center justify-between border-b bg-white px-4">
                <div className="flex items-center space-x-3">
                    <Link href={route('books.index')} className="text-gray-500 hover:text-gray-700">
                        ← Back
                    </Link>
                    {isRenamingBook ? (
                        <form onSubmit={handleUpdateBookTitle} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={bookTitleForm.data.title}
                                onChange={(e) => bookTitleForm.setData('title', e.target.value)}
                                className="h-7 rounded border px-2 py-0.5 text-sm font-semibold"
                                autoFocus
                            />
                            <button type="submit" className="text-xs text-indigo-600 font-bold">Save</button>
                            <button type="button" onClick={() => setIsRenamingBook(false)} className="text-xs text-gray-500">Cancel</button>
                        </form>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-800">{book.title}</span>
                            {canManage && (
                                <button onClick={() => setIsRenamingBook(true)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {canManage ? 'Author' : 'Collaborator'}
                    </span>
                </div>
                {canManage && (
                    <button
                        onClick={() => setShowShare(!showShare)}
                        className="rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-200"
                    >
                        Share
                    </button>
                )}
            </header>

            {showShare && canManage && (
                <div className="border-b bg-gray-50 p-4">
                    <div className="mx-auto max-w-md">
                        <p className="mb-2 text-sm font-semibold text-gray-700">Invite Collaborator</p>
                        <form onSubmit={handleInvite} className="flex space-x-2">
                            <input
                                type="email"
                                value={collaboratorForm.data.email}
                                onChange={(e) => collaboratorForm.setData('email', e.target.value)}
                                placeholder="Enter email"
                                className="flex-1 rounded border px-3 py-1 text-sm"
                            />
                            <button type="submit" className="rounded bg-indigo-600 px-3 py-1 text-sm text-white">
                                Invite
                            </button>
                        </form>
                        {collaboratorForm.errors.email && (
                            <p className="mt-1 text-sm text-red-600">{collaboratorForm.errors.email}</p>
                        )}
                        {book.collaborators?.length > 0 && (
                            <div className="mt-3">
                                <p className="mb-1 text-xs text-gray-500">Current Collaborators:</p>
                                {book.collaborators.map((c) => (
                                    <div key={c.id} className="flex items-center justify-between rounded bg-white px-2 py-1 text-sm">
                                        <span>{c.name} ({c.email})</span>
                                        <button onClick={() => handleRemoveCollaborator(c.id)} className="text-red-500">×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-56 overflow-y-auto border-r bg-white p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">Sections</p>
                    {canManage && (
                        <form onSubmit={handleAddSection} className="mb-3">
                            <input
                                type="text"
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="+ Add section"
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
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
                        <p className="text-xs text-gray-400">No sections yet</p>
                    )}
                </aside>

                <main className="flex-1 overflow-y-auto p-6">
                    {selectedSection ? (
                        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mb-4 w-full border-b pb-2 text-xl font-bold focus:outline-none"
                                placeholder="Section Title"
                            />
                            <RichTextEditor
                                content={data.content}
                                onUpdate={(html) => setData('content', html)}
                            />
                            <button
                                onClick={handleSave}
                                disabled={processing}
                                className="mt-4 rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                            Select a section to edit
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
