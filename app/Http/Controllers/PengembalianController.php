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
        $pengembalian->user_id = Auth::user()->id;
        $pengembalian->biaya_sewa = $pinjam->sewa;
        // dd($pengembalian);
        $pengembalian->save();

        return redirect()->route('pengembalians.index');
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
