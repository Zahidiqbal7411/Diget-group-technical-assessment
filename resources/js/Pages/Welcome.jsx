import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Diget Group - Cloud Notebook Platform" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">Diget Group</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('books.index')}
                                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-medium text-gray-300 transition hover:text-white"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                            Cloud-Based
                            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Notebook Platform
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                            Write, save, and collaborate on books with unlimited sections and subsections.
                            Real-time collaboration with role-based access control.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-700"
                            >
                                Start Writing
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-xl border border-gray-600 px-8 py-4 text-lg font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="mt-24 grid gap-8 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
                                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Unlimited Sections</h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Create unlimited nested sections and subsections with infinite depth.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Role-Based Access</h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Authors control everything. Collaborators can edit but not restructure.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20">
                                <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Cloud Storage</h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Everything stored securely in the cloud. No local files needed.
                            </p>
                        </div>
                    </div>
                </main>

                <footer className="py-8 text-center text-sm text-gray-500">
                    Diget Group Technical Assessment © 2025
                </footer>
            </div>
        </>
    );
}
