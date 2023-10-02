import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function PinjamMobil({ auth }) {

    const { manajemens } = usePage().props

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        tgl_mulai: "",
        tgl_selesai: "",
        manajemen_id: "",
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("pinjams.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pinjam Mobil</h2>}
        >
            <Head title="Pinjam Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="tgl_mulai" value="Tanggal Mulai" />

                                    <TextInput
                                        id="tgl_mulai"
                                        name="tgl_mulai"
                                        value={data.tgl_mulai}
                                        onChange={(e) => setData('tgl_mulai', e.target.value)}
                                        type="date"
                                        className="w-full px-4 py-2"
                                        autoComplete="tgl_mulai"
                                    />

                                    <InputError message={errors.tgl_mulai} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tgl_selesai" value="Tanggal Selesai" />

                                    <TextInput
                                        id="tgl_selesai"
                                        name="tgl_selesai"
                                        value={data.tgl_selesai}
                                        onChange={(e) => setData('tgl_selesai', e.target.value)}
                                        type="date"
                                        className="w-full px-4 py-2"
                                        autoComplete="tgl_selesai"
                                    />

                                    <InputError message={errors.tgl_selesai} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="manajemen_id" value="Pilih Mobil" />
                                    <SelectInput
                                     id="manajemen_id" 
                                     name="manajemen_id" 
                                     className="w-full px-4 py-2" 
                                     autoComplete="manajemen_id"
                                     onChange={(e) => setData('manajemen_id', e.target.value)}
                                    >
                                        <option>--Pilih Mobil--</option>
                                        {manajemens.map(({ id, merek, model, nomor_plat, tarif_sewa }) => (
                                            <option value={id}>Merek: {merek}, Model: {model}, Nomor Plat: {nomor_plat}, Tarif Sewa/Hari: IDR. {tarif_sewa}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.manajemen_id} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Link
                                    className="px-6 py-2 text-white bg-yellow-500 rounded-md focus:outline-none"
                                    href={ route("pinjams.index") }
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
                                        <p className="text-sm text-gray-600">Data tidak valid.</p>
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