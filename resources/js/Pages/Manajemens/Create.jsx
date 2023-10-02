import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function TambahMobil({ auth }) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        merek: "",
        model: "",
        nomor_plat: "",
        tarif_sewa: ""
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("manajemens.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Mobil</h2>}
        >
            <Head title="Tambah Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="merek" value="Merek Mobil" />

                                    <TextInput
                                        id="merek"
                                        name="merek"
                                        value={data.merek}
                                        onChange={(e) => setData('merek', e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-2"
                                        autoComplete="merek"
                                    />

                                    <InputError message={errors.merek} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="model" value="Model Mobil" />

                                    <TextInput
                                        id="model"
                                        name="model"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-2"
                                        autoComplete="model"
                                    />

                                    <InputError message={errors.model} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="nomor_plat" value="Plat Nomer" />

                                    <TextInput
                                        id="nomor_plat"
                                        name="nomor_plat"
                                        value={data.nomor_plat}
                                        onChange={(e) => setData('nomor_plat', e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-2"
                                        autoComplete="nomor_plat"
                                    />

                                    <InputError message={errors.nomor_plat} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tarif_sewa" value="Tarif Sewa Per Hari" />

                                    <TextInput
                                        id="tarif_sewa"
                                        name="tarif_sewa"
                                        value={data.tarif_sewa}
                                        onChange={(e) => setData('tarif_sewa', e.target.value)}
                                        type="number"
                                        className="w-full px-4 py-2"
                                        autoComplete="tarif_sewa"
                                    />

                                    <InputError message={errors.tarif_sewa} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Link
                                    className="px-6 py-2 text-white bg-yellow-500 rounded-md focus:outline-none"
                                    href={ route("manajemens.index") }
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