<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjam extends Model
{
    use HasFactory;

    protected $fillable = [
        'tgl_mulai', 'tgl_selesai', 'manajemen_id', 'user_id'
    ];

    public function manajemen(){
        return $this->belongsTo(Manajemen::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}