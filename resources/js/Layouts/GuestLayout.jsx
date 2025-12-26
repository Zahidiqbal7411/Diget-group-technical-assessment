import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 pt-6 sm:justify-center sm:pt-0">
            <div className="text-center">
                <Link href="/" className="flex flex-col items-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                        <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Diget Group</h1>
                    <p className="text-sm text-indigo-300">Cloud Notebook Platform</p>
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-white/95 backdrop-blur px-6 py-8 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>

            <p className="mt-6 text-xs text-indigo-300/70">
                Technical Assessment © 2025
            </p>
        </div>
    );
}
