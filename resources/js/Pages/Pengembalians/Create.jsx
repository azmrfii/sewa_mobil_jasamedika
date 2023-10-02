import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Pengembalian({ auth }) {
    const { pinjams } = usePage().props

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        pinjam_id: ""
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("pengembalians.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengembalian Mobil</h2>}
        >
            <Head title="Pengembalian Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                              
                                <div>
                                    <InputLabel htmlFor="pinjam_id" value="Pinjam Id" />

                                    <SelectInput
                                    id="pinjam_id" 
                                    name="pinjam_id" 
                                    className="w-full px-4 py-2" 
                                    autoComplete="pinjam_id"
                                    onChange={(e) => setData('pinjam_id', e.target.value)}
                                    >
                                        <option>--Kembalikan Pinjaman--</option>
                                        {pinjams.map(({ id, tgl_mulai, tgl_selesai, manajemen_id, sewa }) => (
                                             <option value={id}>Mobil Id: {manajemen_id}, Sewa: {sewa}</option>
                                        ))}
                                    </SelectInput>
                                    {/* <SelectInput
                                     id="pinjam_id" 
                                     name="pinjam_id" 
                                     className="w-full px-4 py-2" 
                                     autoComplete="pinjam_id"
                                     onChange={(e) => setData('pinjam_id', e.target.value)}
                                    >
                                        <option>--Kembalikan Pinjaman--</option>
                                        {pinjams.map(({ id, tgl_mulai, tgl_selesai, manajemen_id, sewa }) => (
                                            <option value={pinjam_id}>Tanggal Mulai: {tgl_mulai}, Tanggal Selesai: {tgl_akhir}, Mobil Id: {manajemen_id}, Tarif Sewa: IDR. {sewa}</option>
                                        ))}
                                    </SelectInput> */}

                                    <InputError message={errors.pinjam_id} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Link
                                    className="px-6 py-2 text-white bg-yellow-500 rounded-md focus:outline-none"
                                    href={ route("pengembalians.index") }
                                    >
                                        Back
                                    </Link>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}