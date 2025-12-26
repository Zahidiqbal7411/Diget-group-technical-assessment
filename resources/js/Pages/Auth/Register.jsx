import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'author',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account - Diget Group" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-sm text-gray-500">Join the notebook platform</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="I want to register as:" />
                    <div className="mt-2 flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="author"
                                checked={data.role === 'author'}
                                onChange={(e) => setData('role', e.target.value)}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 font-medium">Author</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="collaborator"
                                checked={data.role === 'collaborator'}
                                onChange={(e) => setData('role', e.target.value)}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 font-medium">Collaborator</span>
                        </label>
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Create Account
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-500">Already have an account? </span>
                    <Link
                        href={route('login')}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
