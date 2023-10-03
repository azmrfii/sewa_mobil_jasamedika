import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Manajemen({ auth }) {
    const { manajemens } = usePage().props

    function destroy(e) {
        if (confirm("anda yakin ingin menghapus data ini?")) {
            router.delete(route("manajemens.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Mobil</h2>}
        >
            <Head title="Manajemen Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("manajemens.create") }
                                >
                                    Tambah Mobil
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Merek</th>
                                        <th className="px-4 py-2">Model</th>
                                        <th className="px-4 py-2">Nomor Plat</th>
                                        <th className="px-4 py-2">Tarif Sewa</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manajemens.map(({ id, merek, model, nomor_plat, tarif_sewa, status }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ merek }</td>
                                            <td className="border px-4 py-2">{ model }</td>
                                            <td className="border px-4 py-2">{ nomor_plat }</td>
                                            <td className="border px-4 py-2">IDR. { tarif_sewa }</td>
                                            <td className="border px-4 py-2">{ status }</td>
                                            {status === "tersedia" ? (
                                                <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("manajemens.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                                </td>
                                            ) : (
                                                <td className="border px-4 py-2">--</td>
                                            )}
                                            {/* <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("manajemens.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td> */}

                                        </tr>
                                    ))}
                                    {manajemens.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                Mobil tidak tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
