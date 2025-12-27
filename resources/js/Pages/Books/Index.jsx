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
            <Head title="My Library" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {ownedBooks.length === 0 && sharedBooks.length === 0 ? (
                        <div className="card-premium p-16 text-center">
                            <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Your library is empty</h3>
                            <p className="mb-10 text-slate-500 font-medium max-w-md mx-auto">
                                {isAuthor ? "Begin your journey by creating your first masterpiece. Your ideas deserve a beautiful space." : "You haven't been assigned to any projects yet. Reach out to your team lead."}
                            </p>
                            {isAuthor && (
                                <Link
                                    href={route('books.create')}
                                    className="rounded-2xl btn-primary-gradient px-8 py-4 text-base font-bold shadow-xl transition-all hover:scale-105"
                                >
                                    + Create First Book
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {isAuthor && ownedBooks.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-x-4 mb-6">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">My Publications ({ownedBooks.length})</h3>
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                    </div>
                                    <div className="grid gap-6">
                                        {ownedBooks.map((book) => (
                                            <div key={book.id} className="card-premium p-6 group transition-all hover:border-indigo-100">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <Link href={route('books.edit', book.id)} className="block group/title">
                                                            <p className="text-lg font-extrabold text-slate-900 group-hover/title:text-indigo-600 transition-colors mb-1">{book.title}</p>
                                                        </Link>
                                                        <p className="text-slate-500 font-medium mb-4 line-clamp-2 max-w-2xl">{book.description || 'No description provided.'}</p>
                                                        {book.collaborators?.length > 0 && (
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="flex -space-x-2">
                                                                    {book.collaborators.map((c) => (
                                                                        <div key={c.id} title={c.name} className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                                            {c.name.charAt(0)}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest ml-1">Active Team</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <Link
                                                            href={route('books.edit', book.id)}
                                                            className="rounded-xl bg-indigo-50 px-6 py-2.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white"
                                                        >
                                                            Open Editor
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(book.id)}
                                                            className="rounded-xl bg-slate-50 px-3 py-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!isAuthor && sharedBooks.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-x-4 mb-6">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Shared Works ({sharedBooks.length})</h3>
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                    </div>
                                    <div className="grid gap-6">
                                        {sharedBooks.map((book) => (
                                            <div key={book.id} className="card-premium p-6 group transition-all hover:border-purple-100">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <Link href={route('books.edit', book.id)} className="block group/title">
                                                            <p className="text-lg font-extrabold text-slate-900 group-hover/title:text-purple-600 transition-colors mb-1">{book.title}</p>
                                                        </Link>
                                                        <p className="text-slate-500 font-medium mb-4 line-clamp-2 max-w-2xl">{book.description || 'No context provided.'}</p>
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-600">
                                                                {book.author?.name.charAt(0)}
                                                            </div>
                                                            <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Lead: {book.author?.name}</p>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={route('books.edit', book.id)}
                                                        className="rounded-xl bg-purple-50 px-8 py-2.5 text-xs font-bold text-purple-700 transition-all hover:bg-purple-600 hover:text-white"
                                                    >
                                                        Collaborate
                                                    </Link>
                                                </div>
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
