import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        alamat: '',
        nomor_handphone: '',
        nomor_sim: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nama" value="nama" />

                    <TextInput
                        id="nama"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        autoComplete="nama"
                        isFocused={true}
                        onChange={(e) => setData('nama', e.target.value)}
                        required
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="alamat" value="alamat" />

                    <TextInput
                        id="alamat"
                        type="text"
                        name="alamat"
                        value={data.alamat}
                        className="mt-1 block w-full"
                        autoComplete="alamat"
                        onChange={(e) => setData('alamat', e.target.value)}
                        required
                    />

                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nomor_handphone" value="nomor_handphone" />

                    <TextInput
                        id="nomor_handphone"
                        type="number"
                        min="12"
                        name="nomor_handphone"
                        value={data.nomor_handphone}
                        className="mt-1 block w-full"
                        autoComplete="nomor_handphone"
                        onChange={(e) => setData('nomor_handphone', e.target.value)}
                        required
                    />

                    <InputError message={errors.nomor_handphone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nomor_sim" value="nomor_sim" />

                    <TextInput
                        id="nomor_sim"
                        type="number"
                        min="12"
                        name="nomor_sim"
                        value={data.nomor_sim}
                        className="mt-1 block w-full"
                        autoComplete="nomor_sim"
                        onChange={(e) => setData('nomor_sim', e.target.value)}
                        required
                    />

                    <InputError message={errors.nomor_sim} className="mt-2" />
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

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
