import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ books }) {
    const handleDelete = (bookId) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', bookId));
        }
    };

    const ownedBooks = books.filter(book => book.is_owner);
    const sharedBooks = books.filter(book => !book.is_owner);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My Notebooks
                    </h2>
                    <Link
                        href={route('books.create')}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-600 hover:to-purple-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Book
                    </Link>
                </div>
            }
        >
            <Head title="My Notebooks" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {books.length === 0 ? (
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                            <div className="p-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">No notebooks yet</h3>
                                <p className="mt-1 text-sm text-gray-500">Create your first notebook to start writing</p>
                                <Link
                                    href={route('books.create')}
                                    className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    Create Your First Book
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {ownedBooks.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-700">
                                        My Books
                                        <span className="ml-2 text-sm font-normal text-gray-400">({ownedBooks.length})</span>
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {ownedBooks.map((book) => (
                                            <BookCard key={book.id} book={book} onDelete={handleDelete} isOwner={true} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {sharedBooks.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-700">
                                        Shared With Me
                                        <span className="ml-2 text-sm font-normal text-gray-400">({sharedBooks.length})</span>
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {sharedBooks.map((book) => (
                                            <BookCard key={book.id} book={book} onDelete={handleDelete} isOwner={false} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function BookCard({ book, onDelete, isOwner }) {
    const collaboratorCount = book.collaborators_count || book.collaborators?.length || 0;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
            <div className="absolute right-3 top-3 flex items-center space-x-2">
                {collaboratorCount > 0 && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {collaboratorCount}
                    </span>
                )}
                {isOwner ? (
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                        Author
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Collaborator
                    </span>
                )}
            </div>
            <div className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {book.description || 'No description'}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                    By {book.author?.name || 'Unknown'}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                    <Link
                        href={route('books.edit', book.id)}
                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                    >
                        <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Open
                    </Link>
                    {isOwner && (
                        <button
                            onClick={() => onDelete(book.id)}
                            className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
