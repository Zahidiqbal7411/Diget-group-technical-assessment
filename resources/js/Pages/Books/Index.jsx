import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ books }) {
    const { auth } = usePage().props;
    const isAuthor = auth.user.role === 'author';

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', id));
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
                    {isAuthor && (
                        <Link
                            href={route('books.create')}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            + New Book
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="My Books" />

            <div className="py-6">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {ownedBooks.length === 0 && sharedBooks.length === 0 ? (
                        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                            <p className="mb-4 text-gray-500">
                                {isAuthor ? "You don't have any books yet" : "No books have been shared with you yet"}
                            </p>
                            {isAuthor && (
                                <Link
                                    href={route('books.create')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    Create Your First Book
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {isAuthor && ownedBooks.length > 0 && (
                                <div>
                                    <h3 className="mb-3 font-semibold text-gray-700">My Books ({ownedBooks.length})</h3>
                                    <div className="space-y-2">
                                        {ownedBooks.map((book) => (
                                            <div key={book.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                                                <div>
                                                    <p className="font-medium text-gray-900">{book.title}</p>
                                                    <p className="text-sm text-gray-500">{book.description || 'No description'}</p>
                                                    {book.collaborators?.length > 0 && (
                                                        <p className="text-xs text-indigo-600">
                                                            Collaborators: {book.collaborators.map(c => c.name).join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('books.edit', book.id)}
                                                        className="rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(book.id)}
                                                        className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!isAuthor && sharedBooks.length > 0 && (
                                <div>
                                    <h3 className="mb-3 font-semibold text-gray-700">Shared With Me ({sharedBooks.length})</h3>
                                    <div className="space-y-2">
                                        {sharedBooks.map((book) => (
                                            <div key={book.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                                                <div>
                                                    <p className="font-medium text-gray-900">{book.title}</p>
                                                    <p className="text-sm text-gray-500">{book.description || 'No description'}</p>
                                                    <p className="text-xs text-indigo-600">Author: {book.author?.name}</p>
                                                </div>
                                                <Link
                                                    href={route('books.edit', book.id)}
                                                    className="rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-200"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
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
