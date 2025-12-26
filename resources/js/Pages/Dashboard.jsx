import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ ownedBooksCount, sharedBooksCount, recentOwnedBooks, recentSharedBooks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-indigo-100">My Books</p>
                                    <p className="text-3xl font-bold">{ownedBooksCount}</p>
                                </div>
                                <div className="rounded-full bg-white/20 p-3">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-purple-100">Shared With Me</p>
                                    <p className="text-3xl font-bold">{sharedBooksCount}</p>
                                </div>
                                <div className="rounded-full bg-white/20 p-3">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-emerald-100">Total Books</p>
                                    <p className="text-3xl font-bold">{ownedBooksCount + sharedBooksCount}</p>
                                </div>
                                <div className="rounded-full bg-white/20 p-3">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('books.create')}
                            className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-gray-500 transition hover:border-indigo-500 hover:text-indigo-600"
                        >
                            <div className="text-center">
                                <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <p className="mt-2 text-sm font-medium">Create New Book</p>
                            </div>
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">My Recent Books</h3>
                                <Link href={route('books.index')} className="text-sm text-indigo-600 hover:text-indigo-800">
                                    View All →
                                </Link>
                            </div>
                            {recentOwnedBooks.length === 0 ? (
                                <p className="text-sm text-gray-500">No books created yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentOwnedBooks.map((book) => (
                                        <Link
                                            key={book.id}
                                            href={route('books.edit', book.id)}
                                            className="flex items-center rounded-lg p-3 transition hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                                                <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">{book.title}</p>
                                                <p className="text-xs text-gray-500">{book.description || 'No description'}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Shared With Me</h3>
                                <Link href={route('books.index')} className="text-sm text-indigo-600 hover:text-indigo-800">
                                    View All →
                                </Link>
                            </div>
                            {recentSharedBooks.length === 0 ? (
                                <p className="text-sm text-gray-500">No books shared with you yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentSharedBooks.map((book) => (
                                        <Link
                                            key={book.id}
                                            href={route('books.edit', book.id)}
                                            className="flex items-center rounded-lg p-3 transition hover:bg-gray-50"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">{book.title}</p>
                                                <p className="text-xs text-gray-500">By {book.author?.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
