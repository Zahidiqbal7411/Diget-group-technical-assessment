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

    const bookMetadataForm = useForm({
        title: book.title,
        description: book.description || '',
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

    const handleUpdateBookMetadata = (e) => {
        e.preventDefault();
        bookMetadataForm.put(route('books.update', book.id), {
            onSuccess: () => setIsRenamingBook(false),
        });
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <Head title={book.title} />

            <header className="relative flex h-12 items-center justify-between border-b bg-white px-4">
                <div className="flex items-center space-x-3">
                    <Link href={route('books.index')} className="text-gray-500 hover:text-gray-700">
                        ← Back
                    </Link>
                    <span className="font-semibold text-gray-800">{book.title}</span>
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

                {showShare && canManage && (
                    <div className="absolute right-4 top-12 z-50 w-80 rounded-lg border bg-white p-4 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-800">Invite Collaborators</p>
                            <button onClick={() => setShowShare(false)} className="text-gray-400 hover:text-gray-600">×</button>
                        </div>
                        <form onSubmit={handleInvite} className="mb-4 flex space-x-2">
                            <input
                                type="email"
                                value={collaboratorForm.data.email}
                                onChange={(e) => collaboratorForm.setData('email', e.target.value)}
                                placeholder="Enter email"
                                className="flex-1 rounded border px-3 py-1 text-sm focus:ring-1 focus:ring-indigo-500"
                                autoFocus
                            />
                            <button type="submit" disabled={collaboratorForm.processing} className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700">
                                Invite
                            </button>
                        </form>
                        {collaboratorForm.errors.email && (
                            <p className="mb-3 text-xs text-red-600">{collaboratorForm.errors.email}</p>
                        )}
                        {book.collaborators?.length > 0 && (
                            <div>
                                <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Collaborators</p>
                                <div className="max-h-40 overflow-y-auto space-y-1">
                                    {book.collaborators.map((c) => (
                                        <div key={c.id} className="flex items-center justify-between rounded bg-gray-50 px-2 py-1.5 text-sm">
                                            <span className="truncate mr-2 text-gray-700">{c.name}</span>
                                            <button onClick={() => handleRemoveCollaborator(c.id)} className="text-gray-400 hover:text-red-500 font-bold">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-56 overflow-y-auto border-r bg-white p-4">
                    <button
                        onClick={() => setSelectedSection(null)}
                        className={`mb-4 w-full text-left rounded px-2 py-1 text-sm font-semibold ${!selectedSection ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        📔 Book Details
                    </button>
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
                        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Book Details</h2>
                            <form onSubmit={handleUpdateBookMetadata} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={bookMetadataForm.data.title}
                                        onChange={(e) => bookMetadataForm.setData('title', e.target.value)}
                                        className="w-full rounded border px-3 py-2"
                                        placeholder="Book Title"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={bookMetadataForm.data.description}
                                        onChange={(e) => bookMetadataForm.setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full rounded border px-3 py-2"
                                        placeholder="Book Description"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={bookMetadataForm.processing}
                                    className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Save Book Details
                                </button>
                                {bookMetadataForm.recentlySuccessful && (
                                    <span className="ml-3 text-sm text-green-600 font-medium animate-pulse">Saved!</span>
                                )}
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
