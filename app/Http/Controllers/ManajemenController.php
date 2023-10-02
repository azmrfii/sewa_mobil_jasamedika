<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Manajemen;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ManajemenRequest;
use GuzzleHttp\Psr7\Request;

class ManajemenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $manajemens = Manajemen::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Manajemens/Index', ['manajemens' => $manajemens]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Manajemens/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ManajemenRequest $request)
    {
        Manajemen::create($request->validated() + ['user_id' => auth()->id()]);
    
        return redirect()->route('manajemens.index');
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
    public function edit(Manajemen $manajemen)
    {
        return Inertia::render('Manajemens/Edit', [
            'manajemen' => $manajemen
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManajemenRequest $request, string $id)
    {
        Manajemen::find($id)->update($request->all());
        return redirect()->route('manajemens.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Manajemen::find($id)->delete();
        return redirect()->route('manajemens.index');
    }
}
