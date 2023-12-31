<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Pinjam;
use App\Models\Manajemen;
use Illuminate\Http\Request;
use function Laravel\Prompts\alert;
use App\Http\Requests\PinjamRequest;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

class PinjamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pinjams = Pinjam::where('user_id', Auth::user()->id)->get();
        $manajemens = Manajemen::all();

        return Inertia::render('Pinjams/Index', compact('pinjams', 'manajemens'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $manajemens = Manajemen::where('status', 'tersedia')->get();

        return Inertia::render('Pinjams/Create', compact('manajemens'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'manajemen_id' => 'required|integer|exists:manajemens,id',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date|after:tgl_mulai',
        ]);
        
        $manajemen = Manajemen::find($request->manajemen_id);
        if($manajemen->status == 'tersedia') {
            $pinjam = new Pinjam;
            $pinjam->tgl_mulai = Carbon::parse($request->tgl_mulai);
            $pinjam->tgl_selesai = Carbon::parse($request->tgl_selesai);

            $days = $pinjam->tgl_selesai->diffInDays($pinjam->tgl_mulai);

            $pinjam->manajemen_id = $request->input('manajemen_id');
            $pinjam->user_id = Auth::user()->id;
            $pinjam->sewa = $manajemen->tarif_sewa * $days;
            // dd($pinjam);
            $pinjam->save();

            return redirect()->route('pinjams.index');
        }

        return redirect()->route('pinjams.index');
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
    public function edit(Pinjam $pinjam)
    {
        if($pinjam->status != 'sedang_disewa') {
            return redirect()->route('pinjams.index');
        }

        return Inertia::render('Pinjams/Edit', [
            'pinjam' => $pinjam
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PinjamRequest $request, string $id)
    {
        Pinjam::find($id)->update($request->validated());
        return redirect()->route('pinjams.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Pinjam::find($id)->delete();
        return redirect()->route('pinjams.index');
    }
}
