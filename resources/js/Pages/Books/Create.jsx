import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">Create New Book</h2>
            }
        >
            <Head title="Create Book" />

            <div className="py-6">
                <div className="mx-auto max-w-md px-4">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 w-full rounded border px-3 py-2"
                                    placeholder="Enter book title"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded border px-3 py-2"
                                    rows="3"
                                    placeholder="Brief description"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Create Book
                                </button>
                                <Link
                                    href={route('books.index')}
                                    className="rounded border px-4 py-2 text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
