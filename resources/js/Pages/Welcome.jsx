import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
            <Head title="Diget Group - Cloud Notebook Platform" />


            <header className="fixed top-0 z-50 w-full glass">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                    <div className="flex items-center gap-x-3 group cursor-pointer">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Diget<span className="text-indigo-600">Group</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-x-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-bold leading-6 text-indigo-600 transition-all hover:translate-x-1"
                            >
                                Enter Dashboard <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold leading-6 text-slate-600 transition hover:text-indigo-600"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all hover:bg-indigo-600 hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main>
                <section className="relative isolate pt-24 lg:pt-36">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#818cf8] to-[#c084fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                            <div className="flex">
                                <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-xs font-bold leading-6 text-indigo-600 ring-1 ring-indigo-600/10 bg-indigo-50/50">
                                    <span className="">v2.0 Beta</span>
                                    <span className="h-4 w-px bg-indigo-200" aria-hidden="true"></span>
                                    <span className="flex items-center gap-x-1">
                                        Collaboration Reimagined
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <h1 className="mt-10 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                                Next-Gen <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Cloud Notebook</span> Collaboration
                            </h1>
                            <p className="mt-8 text-xl leading-relaxed text-slate-600">
                                Design and build your library on a platform centered on seamless real-time collaboration and cloud storage. Experience infinite structure without local file management.
                            </p>
                            <div className="mt-12 flex items-center gap-x-8">
                                <Link
                                    href={route('register')}
                                    className="rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                                >
                                    Build Your First Book
                                </Link>
                                <Link href="#features" className="text-sm font-bold leading-6 text-slate-900 hover:text-indigo-600 transition-colors">
                                    Explore Features <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                            <div className="relative mx-auto max-w-[550px] rounded-[2.5rem] bg-gradient-to-br from-slate-200 to-white p-2 shadow-inner lg:-mr-12">
                                <div className="rounded-[2rem] bg-white shadow-2xl overflow-hidden border border-white">
                                    <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 px-5 py-4 flex items-center justify-between">
                                        <div className="flex gap-x-2">
                                            <div className="h-3.5 w-3.5 rounded-full bg-[#FF5F57]"></div>
                                            <div className="h-3.5 w-3.5 rounded-full bg-[#FFBD2E]"></div>
                                            <div className="h-3.5 w-3.5 rounded-full bg-[#28C840]"></div>
                                        </div>
                                        <div className="flex items-center gap-x-2 rounded-full bg-white px-4 py-1.5 border border-slate-100 shadow-sm">
                                            <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Editor View</span>
                                        </div>
                                    </div>
                                    <div className="p-10 space-y-6">
                                        <div className="space-y-2">
                                            <div className="h-6 w-3/4 rounded-lg bg-slate-100 animate-pulse"></div>
                                            <div className="h-6 w-1/2 rounded-lg bg-slate-100/60 animate-pulse"></div>
                                        </div>
                                        <div className="h-32 w-full rounded-2xl bg-indigo-50/30 border border-indigo-100 shadow-inner p-4">
                                            <div className="space-y-2">
                                                <div className="h-3 w-full rounded-full bg-indigo-100/50"></div>
                                                <div className="h-3 w-5/6 rounded-full bg-indigo-100/50"></div>
                                                <div className="h-3 w-4/6 rounded-full bg-indigo-100/50"></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-6 pt-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-28 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
                                                    <div className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-slate-100"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-white py-32 sm:py-48 relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-bold leading-7 text-indigo-600 uppercase tracking-[0.2em]">The Blueprint</h2>
                            <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                                Engineered for <span className="text-indigo-600">Deep Work</span>
                            </p>
                            <p className="mt-8 text-xl leading-relaxed text-slate-600">
                                Ditch the messy folders and version-controlled chaos. Our platform provides the structural integrity your projects deserve.
                            </p>
                        </div>
                        <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-20 lg:max-w-none lg:grid-cols-3">
                                {[
                                    {
                                        name: 'Infinite Nesting',
                                        description: 'Create an unlimited number of sections and subsections with infinite nesting levels for total structural control.',
                                        icon: (
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        ),
                                        color: 'bg-indigo-600'
                                    },
                                    {
                                        name: 'Role-Based Access',
                                        description: 'Authors manage structure and permissions, while Collaborators contribute content in a secure, defined ecosystem.',
                                        icon: (
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        ),
                                        color: 'bg-purple-600'
                                    },
                                    {
                                        name: 'Cloud-First Storage',
                                        description: 'Everything is stored in the cloud. No local files to manage—just pure creative flow and instant global accessibility.',
                                        icon: (
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        ),
                                        color: 'bg-rose-600'
                                    }
                                ].map((feature) => (
                                    <div key={feature.name} className="flex flex-col group">
                                        <dt className="flex items-center gap-x-4 text-lg font-bold leading-7 text-slate-900">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color} shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300`}>
                                                {feature.icon}
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-6 flex flex-auto flex-col text-base leading-relaxed text-slate-500">
                                            <p className="flex-auto">{feature.description}</p>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900 py-32 sm:py-48 relative isolate overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.wordless),theme(colors.slate.950))] opacity-20"></div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-y-20 text-center lg:grid-cols-3">
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-sm font-bold uppercase tracking-widest text-slate-400">User Satisfaction</dt>
                                <dd className="order-first text-5xl font-extrabold tracking-tight text-white sm:text-7xl">99.9<span className="text-indigo-500">%</span></dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-sm font-bold uppercase tracking-widest text-slate-400">Uptime Guarantee</dt>
                                <dd className="order-first text-5xl font-extrabold tracking-tight text-white sm:text-7xl">100<span className="text-indigo-500">%</span></dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-sm font-bold uppercase tracking-widest text-slate-400">Chapters Created</dt>
                                <dd className="order-first text-5xl font-extrabold tracking-tight text-white sm:text-7xl">1M<span className="text-indigo-500">+</span></dd>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-slate-900 px-6 pt-16 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.25)] sm:rounded-[3rem] sm:px-24 md:pt-24 lg:flex lg:gap-x-20 lg:pt-0">
                            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                    Ready to <span className="text-indigo-400">Transform</span> Your Library?
                                </h2>
                                <p className="mt-8 text-xl leading-relaxed text-slate-300">
                                    Join world-class authors building the future of documentation. Scale your vision without limits.
                                </p>
                                <div className="mt-12 flex items-center justify-center gap-x-8 lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="rounded-2xl bg-white px-10 py-5 text-lg font-bold text-slate-900 shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
                                    >
                                        Deploy Now
                                    </Link>
                                    <Link href={route('login')} className="text-sm font-bold leading-6 text-white group">
                                        Member Login <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative mt-16 h-80 lg:mt-8">
                                <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-2xl bg-white/5 ring-1 ring-white/10 p-10 backdrop-blur-2xl">
                                    <div className="space-y-6">
                                        <div className="h-4 w-3/4 rounded-full bg-slate-700"></div>
                                        <div className="h-4 w-1/2 rounded-full bg-slate-700/60"></div>
                                        <div className="h-32 w-full rounded-3xl bg-indigo-500/10 border border-white/5 overflow-hidden flex items-center justify-center">
                                            <div className="flex gap-x-4">
                                                <div className="h-12 w-12 rounded-full bg-indigo-500/20 blur-sm"></div>
                                                <div className="h-12 w-12 rounded-full bg-purple-500/20 blur-md"></div>
                                                <div className="h-12 w-12 rounded-full bg-pink-500/20 blur-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-20 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-10 md:order-2">
                        <span className="text-sm font-bold text-slate-400 tracking-tighter">DIGET GROUP NEXUS</span>
                    </div>
                    <div className="mt-10 md:order-1 md:mt-0">
                        <p className="text-center text-sm font-medium leading-5 text-slate-500">
                            &copy; 2025 Diget Group, Inc. Crafted for the ambitious.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
