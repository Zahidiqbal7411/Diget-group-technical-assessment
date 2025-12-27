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
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back, {auth.user.name.split(' ')[0]}!</h1>
                            <p className="text-slate-500 font-medium">Here's what's happening in your library.</p>
                        </div>
                        {isAuthor && (
                            <Link
                                href={route('books.create')}
                                className="rounded-2xl btn-primary-gradient px-6 py-3 text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                + Create New Book
                            </Link>
                        )}
                    </div>

                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isAuthor && (
                            <div className="rounded-3xl bg-indigo-50/50 p-6 border border-indigo-100/50 relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-indigo-500/5 transition-transform group-hover:scale-150 duration-500"></div>
                                <p className="text-4xl font-extrabold text-indigo-600 mb-1">{ownedBooksCount}</p>
                                <p className="text-sm font-bold text-indigo-900/60 uppercase tracking-widest">My Publications</p>
                            </div>
                        )}
                        <div className={`rounded-3xl bg-purple-50/50 p-6 border border-purple-100/50 relative overflow-hidden group ${!isAuthor ? 'md:col-span-2' : ''}`}>
                            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-purple-500/5 transition-transform group-hover:scale-150 duration-500"></div>
                            <p className="text-4xl font-extrabold text-purple-600 mb-1">{sharedBooksCount}</p>
                            <p className="text-sm font-bold text-purple-900/60 uppercase tracking-widest">Shared Works</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {isAuthor && (
                            <div className="card-premium p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Recent Notebooks</h3>
                                    <Link href={route('books.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Browse Library &rarr;</Link>
                                </div>
                                {recentOwnedBooks.length === 0 ? (
                                    <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                                        <p className="text-slate-400 font-medium italic">No books yet. Your journey starts here.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {recentOwnedBooks.map((book) => (
                                            <Link
                                                key={book.id}
                                                href={route('books.edit', book.id)}
                                                className="group relative flex flex-col rounded-2xl border border-slate-100 p-5 transition-all hover:bg-slate-50/50 hover:border-indigo-100 hover:shadow-sm"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{book.title}</p>
                                                    <span className="text-xs font-bold text-slate-400">Owner</span>
                                                </div>
                                                <p className="text-sm text-slate-500 line-clamp-1 mb-3">{book.description || 'No description provided.'}</p>
                                                {book.collaborators?.length > 0 && (
                                                    <div className="flex items-center gap-x-2">
                                                        <div className="flex -space-x-2">
                                                            {book.collaborators.slice(0, 3).map((c) => (
                                                                <div key={c.id} title={c.name} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-600">
                                                                    {c.name.charAt(0)}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                                            {book.collaborators.length} Collaborator{book.collaborators.length > 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {isAuthor && (
                            <div className="card-premium p-8 bg-slate-50/30 border-slate-200/40">
                                <div className="mb-6">
                                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Network Activity</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Updates from your collaborators</p>
                                </div>
                                {collaboratorActivity.length === 0 ? (
                                    <p className="text-sm text-slate-400 font-medium italic">Quiet across the network.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {collaboratorActivity.map((activity, idx) => (
                                            <div key={idx} className="flex items-center justify-between rounded-2xl border border-white bg-white/50 p-4 shadow-sm group hover:border-indigo-100 transition-all">
                                                <div className="flex items-center gap-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                                        {activity.editor_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-slate-900 font-medium">
                                                            <span className="font-bold text-indigo-600">{activity.editor_name}</span>
                                                            {" refined "}
                                                            {activity.type === 'section' ? <span className="font-bold">"{activity.title}"</span> : "the meta-details"}
                                                            {" in "}
                                                            <span className="font-bold italic">{activity.book_title}</span>
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-0.5">{activity.updated_at}</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route('books.edit', activity.book_id)}
                                                    className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 transition-all group-hover:bg-indigo-600 group-hover:text-white"
                                                >
                                                    Inspect
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {!isAuthor && recentSharedBooks.length > 0 && (
                            <div className="card-premium p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Assigned Projects</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Works shared with you</p>
                                </div>
                                <div className="grid gap-4">
                                    {recentSharedBooks.map((book) => (
                                        <div
                                            key={book.id}
                                            className="group flex items-center justify-between rounded-2xl border border-slate-100 p-5 transition-all hover:bg-slate-50/50 hover:border-purple-100"
                                        >
                                            <div className="flex-1 mr-6">
                                                <div className="flex items-center gap-x-2 mb-1">
                                                    <p className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{book.title}</p>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                                                    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">{book.author?.name}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 line-clamp-1">{book.description || 'No context provided.'}</p>
                                            </div>
                                            <Link
                                                href={route('books.edit', book.id)}
                                                className="rounded-xl bg-purple-50 px-6 py-2.5 text-xs font-bold text-purple-700 transition-all hover:bg-purple-600 hover:text-white"
                                            >
                                                Collaborate
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
