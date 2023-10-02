import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Pengembalian({ auth }) {
    const { pengembalians } = usePage().props

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
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("pengembalians.create") }
                                >
                                    Pengembalian Mobil
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Pinjam Id</th>
                                        <th className="px-4 py-2">Biaya Sewa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pengembalians.map(({ pinjam_id, biaya_sewa }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ pinjam_id }</td>
                                            <td className="border px-4 py-2">IDR. { biaya_sewa }</td>
                                        </tr>
                                    ))}
  
                                    {pengembalians.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                Tidak tersedia.
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
