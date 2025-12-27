import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ ownedBooksCount, sharedBooksCount, recentOwnedBooks, recentSharedBooks, collaboratorActivity }) {
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
                        {isAuthor && (
                            <div className="rounded-lg bg-indigo-50 p-4">
                                <p className="text-3xl font-bold text-indigo-600">{ownedBooksCount}</p>
                                <p className="text-sm text-gray-600">My Books</p>
                            </div>
                        )}
                        <div className={`rounded-lg bg-purple-50 p-4 ${!isAuthor ? 'col-span-2' : ''}`}>
                            <p className="text-3xl font-bold text-purple-600">{sharedBooksCount}</p>
                            <p className="text-sm text-gray-600">Shared With Me</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {isAuthor && (
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
                                                {book.collaborators?.length > 0 && (
                                                    <p className="text-xs text-indigo-600">
                                                        Collaborators: {book.collaborators.map(c => c.name).join(', ')}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {isAuthor && (
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-gray-800">Collaborator Activity</h3>
                                    <p className="text-xs text-gray-500">Recent updates made by your collaborators</p>
                                </div>
                                {collaboratorActivity.length === 0 ? (
                                    <p className="text-sm text-gray-400">No recent activity from collaborators.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {collaboratorActivity.map((activity, idx) => (
                                            <div key={idx} className="rounded border border-indigo-100 bg-indigo-50/30 p-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-bold text-indigo-700">{activity.editor_name}</span>
                                                        {" updated "}
                                                        {activity.type === 'section' ? (
                                                            <>
                                                                section <span className="font-medium">"{activity.title}"</span> in
                                                            </>
                                                        ) : (
                                                            "book "
                                                        )}
                                                        {" "}
                                                        <span className="font-medium text-gray-800">{activity.book_title}</span>
                                                    </p>
                                                    <span className="text-xs text-gray-400">{activity.updated_at}</span>
                                                </div>
                                                <div className="mt-2">
                                                    <Link
                                                        href={route('books.edit', activity.book_id)}
                                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        View Changes →
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {!isAuthor && recentSharedBooks.length > 0 && (
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800">Shared With Me</h3>
                                    <p className="text-xs text-gray-500">Books shared with you by other authors</p>
                                </div>
                                <div className="space-y-2">
                                    {recentSharedBooks.map((book) => (
                                        <div
                                            key={book.id}
                                            className="flex items-center justify-between rounded border p-3 hover:bg-gray-50"
                                        >
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
