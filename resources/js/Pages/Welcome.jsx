import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
            <Head title="Diget Group - Cloud Notebook Platform" />


            <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                    <div className="flex items-center gap-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Diget Group</span>
                    </div>

                    <div className="flex items-center gap-x-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-semibold leading-6 text-slate-900 transition hover:text-indigo-600"
                            >
                                Dashboard <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold leading-6 text-slate-900 transition hover:text-indigo-600"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-600 transition hover:bg-indigo-500 hover:ring-indigo-500"
                                >
                                    Get Started Free
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main>
                <section className="relative isolate pt-14 lg:pt-32">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                            <div className="flex">
                                <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                                    <span className="font-semibold text-indigo-600">New Feature</span>
                                    <span className="h-4 w-px bg-slate-900/10" aria-hidden="true"></span>
                                    <span className="flex items-center gap-x-1">
                                        Infinite nesting is here
                                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                                A Next-Generation <span className="text-indigo-600">Cloud Notebook</span> for Modern Teams
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Design and build books together in real-time. Create unlimited sections, manage permissions with granular roles, and never worry about local files again.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 active:scale-95"
                                >
                                    Start Collaborating Now
                                </Link>
                                <Link href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600">
                                    Learn more <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                            <div className="relative mx-auto max-w-[500px] rounded-3xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-mr-8 lg:max-w-none">
                                <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden">
                                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-x-2">
                                        <div className="flex gap-x-1.5">
                                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                                        </div>
                                        <div className="mx-auto text-xs font-medium text-slate-400">diget-cloud-notebook.app</div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <div className="h-4 w-3/4 rounded bg-slate-100"></div>
                                        <div className="h-4 w-1/2 rounded bg-slate-100"></div>
                                        <div className="h-20 w-full rounded bg-indigo-50"></div>
                                        <div className="grid grid-cols-3 gap-4 pt-4">
                                            <div className="h-24 rounded bg-slate-50"></div>
                                            <div className="h-24 rounded bg-slate-50"></div>
                                            <div className="h-24 rounded bg-slate-50"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Built for high-performance collaboration
                            </p>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Our platform is designed from the ground up to solve the challenges of modern document management and team collaboration.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        Unlimited Hierarchy
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">Create as many sections and subsections as you need. Our architecture supports infinite nesting of content blocks.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-md">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        Role-Based Controls
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">Fine-grained permissions for Authors and Collaborators. Maintain full control over your content structure while allowing contributions.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-600 shadow-md">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        </div>
                                        Always in Sync
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">Everything is stored in the cloud. Access your notebooks from anywhere, on any device, with zero local management.</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                <section className="bg-indigo-600 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-y-16 text-center lg:grid-cols-3">
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-indigo-100">User Satisfaction</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">99.9%</dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-indigo-100">Uptime Guarantee</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">100%</dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-indigo-100">Sections Created</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">1M+</dd>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-slate-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:pt-0">
                            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                                <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                                <defs>
                                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                        <stop stopColor="#7775D6" />
                                        <stop offset="1" stopColor="#E935C1" />
                                    </radialGradient>
                                </defs>
                            </svg>
                            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Ready to modernize your notebook workflow?
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-slate-300">
                                    Join thousands of users who are already building the future of collaborative documentation with Diget Group.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        Get started
                                    </Link>
                                    <Link href={route('login')} className="text-sm font-semibold leading-6 text-white">
                                        Sign in <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative mt-16 h-80 lg:mt-8">
                                <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 p-8">
                                    <div className="space-y-4 opacity-50">
                                        <div className="h-4 w-3/4 rounded bg-slate-700"></div>
                                        <div className="h-4 w-1/2 rounded bg-slate-700"></div>
                                        <div className="h-32 w-full rounded bg-indigo-500/20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <span className="text-xs text-slate-400">Diget Group Tech Assessment</span>
                    </div>
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-slate-500">
                            &copy; 2025 Diget Group, Inc. All rights reserved. Built with Laravel 12, React, and Inertia.js.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
