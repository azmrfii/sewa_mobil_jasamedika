<?php

namespace App\Http\Controllers;

use DateTime;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Pinjam;
use App\Models\Manajemen;
use App\Models\Pengembalian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PengembalianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengembalians = Pengembalian::where('user_id', Auth::user()->id)->get();

        return Inertia::render('Pengembalians/Index', compact('pengembalians'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pinjams = Pinjam::where('user_id', Auth::user()->id)->get();
        // $pinjams = Pinjam::all();
        return Inertia::render('Pengembalians/Create', compact('pinjams'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'pinjam_id' => 'required|integer|exists:pinjams,id'
        ]);

        $pinjam = Pinjam::find($request->pinjam_id);

        $pengembalian = new Pengembalian;   
        $pengembalian->pinjam_id = $request->input('pinjam_id');
        // $pengembalian->biaya_sewa = $pinjam->manajemen->tarif_sewa * $days;
        $pengembalian->user_id = Auth::user()->id;
        $pengembalian->biaya_sewa = $pinjam->sewa;
        // dd($pengembalian);
        $pengembalian->save();

        return redirect()->route('pengembalians.index');
        // dd($pinjam);

        // $pinjam = Pinjam::where('user_id', Auth::user()->id)->get();
        // $pengembalian = new Pengembalian();

        // $manajemen = Manajemen::all();


        // $pengembalian->nomor_plat = $request->input('nomor_plat');
        // // $pinjam->manajemen_id = $manajemen->id;
        // $pinjam = Pinjam::where('user_id', Auth::user()->id)->where('nomor_plat' == $pinjam->manajemen_id)->get();
        // dd($pinjam);

        // $tgl_mulai = $pinjam->tgl_mulai;
        // $tgl_selesai = $pinjam->tgl_selesai;

        // $banyak_hari = $tgl_mulai->diff($tgl_selesai);

        // $pengembalian->biaya_sewa = $banyak_hari * $manajemen->tarif_sewa; 
        // $pengembalian->user_id = Auth::user()->id;

        // $request->validate([
        //     'nomor_plat' => 'required|exists:manajemen',
        // ]);

        // $pinjam = Pinjam::where('manajemen_id', $request->nomor_plat)->first();
        // $hari = $request->tgl_selesai->diffInDays($pinjam->tgl_mulai);
        // $harga = 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
