import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ ownedBooksCount, sharedBooksCount, recentOwnedBooks, recentSharedBooks }) {
    const { auth } = usePage().props;
    const isAuthor = auth.user.role === 'author';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
                            <p className="text-gray-500">Manage your notebooks here</p>
                        </div>
                        {isAuthor && (
                            <Link
                                href={route('books.create')}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            >
                                + New Book
                            </Link>
                        )}
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-indigo-50 p-4">
                            <p className="text-3xl font-bold text-indigo-600">{ownedBooksCount}</p>
                            <p className="text-sm text-gray-600">My Books</p>
                        </div>
                        <div className="rounded-lg bg-purple-50 p-4">
                            <p className="text-3xl font-bold text-purple-600">{sharedBooksCount}</p>
                            <p className="text-sm text-gray-600">Shared With Me</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800">My Books</h3>
                                <Link href={route('books.index')} className="text-sm text-indigo-600">View All</Link>
                            </div>
                            {recentOwnedBooks.length === 0 ? (
                                <p className="text-gray-400">No books yet. Create your first book!</p>
                            ) : (
                                <div className="space-y-2">
                                    {recentOwnedBooks.map((book) => (
                                        <Link
                                            key={book.id}
                                            href={route('books.edit', book.id)}
                                            className="block rounded border p-3 hover:bg-gray-50"
                                        >
                                            <p className="font-medium text-gray-900">{book.title}</p>
                                            <p className="text-sm text-gray-500">{book.description || 'No description'}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {recentSharedBooks.length > 0 && (
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800">Shared With Me</h3>
                                    <Link href={route('books.index')} className="text-sm text-indigo-600">View All</Link>
                                </div>
                                <div className="space-y-2">
                                    {recentSharedBooks.map((book) => (
                                        <Link
                                            key={book.id}
                                            href={route('books.edit', book.id)}
                                            className="block rounded border p-3 hover:bg-gray-50"
                                        >
                                            <p className="font-medium text-gray-900">{book.title}</p>
                                            <p className="text-sm text-gray-500">By {book.author?.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
