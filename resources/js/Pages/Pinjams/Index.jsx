import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function PinjamMobil({ auth }) {
    const { pinjams } = usePage().props
    const { manajemens } = usePage().props

    function destroy(e) {
        if (confirm("anda yakin ingin cancel data ini?")) {
            router.delete(route("pinjams.destroy", e.currentTarget.id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pinjam Mobil</h2>}
        >
            <Head title="Manajemen Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("pinjams.create") }
                                >
                                    Lakukan Pinjam Mobil
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Tanggal Mulai</th>
                                        <th className="px-4 py-2">Tanggal Selesai</th>
                                        <th className="px-4 py-2">Mobil Id</th>
                                        <th className="px-4 py-2">Sewa</th>
                                        <th className="px-4 py-2">Keterangan</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pinjams.map(({ id, tgl_mulai, tgl_selesai, manajemen_id, user_id, sewa, status }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ tgl_mulai }</td>
                                            <td className="border px-4 py-2">{ tgl_selesai }</td>
                                            <td className="border px-4 py-2">{ manajemen_id }</td>
                                            <td className="border px-4 py-2">IDR. { sewa }</td>
                                            <td className="border px-4 py-2">{ status }</td>
                                            {status === "sedang_disewa" ? (
                                                <td className="border px-4 py-2">
                                                {/* <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("manajemens.edit", id)}
                                                >
                                                    Edit
                                                </Link> */}
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
                                        </tr>
                                    ))}
  
                                    {pinjams.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                Data tidak tersedia.
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
