import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ stats, users, books }) {
    const { post, delete: destroy } = useForm();

    const handleToggleAdmin = (userId) => {
        if (confirm('Toggle admin status for this user?')) {
            post(route('admin.users.toggle', userId));
        }
    };

    const handleToggleRole = (userId) => {
        if (confirm('Toggle global role for this user?')) {
            post(route('admin.users.toggle-role', userId));
        }
    };

    const handleDeleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user? This will delete all their books!')) {
            destroy(route('admin.users.delete', userId));
        }
    };

    const handleDeleteBook = (bookId) => {
        if (confirm('Are you sure you want to delete this book?')) {
            destroy(route('admin.books.delete', bookId));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">System Administration</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 uppercase">Total Users</div>
                            <div className="mt-2 text-3xl font-bold text-indigo-600">{stats.totalUsers}</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 uppercase">Total Books</div>
                            <div className="mt-2 text-3xl font-bold text-purple-600">{stats.totalBooks}</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 uppercase">Administrators</div>
                            <div className="mt-2 text-3xl font-bold text-pink-600">{stats.adminsCount}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* User Management */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b">
                                <h3 className="font-bold text-gray-700">User Management</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2">Name / Email</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-gray-500 text-xs">{user.email}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col space-y-1">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs w-fit ${user.is_admin ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-600'}`}>
                                                            {user.is_admin ? 'Admin' : 'Non-Admin'}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs w-fit ${user.role === 'author' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                                                            Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 flex space-x-2">
                                                    <button
                                                        onClick={() => handleToggleAdmin(user.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Admin
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleRole(user.id)}
                                                        className="text-purple-600 hover:text-purple-900"
                                                    >
                                                        Role
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Book Management */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b">
                                <h3 className="font-bold text-gray-700">Book Management</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2">Title / Author</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {books.map(book => (
                                            <tr key={book.id}>
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">{book.title}</div>
                                                    <div className="text-gray-500 text-xs">By {book.author.name}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex space-x-2">
                                                        <Link href={route('books.edit', book.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
                                                        <button
                                                            onClick={() => handleDeleteBook(book.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
