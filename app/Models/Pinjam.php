<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjam extends Model
{
    use HasFactory;

    protected $fillable = [
        'tgl_mulai', 'tgl_selesai', 'manajemen_id', 'user_id', 'sewa', 'status'
    ];

    public function pengembalians(){
        return $this->hasMany(Pengembalian::class);
    }
    
    public function manajemen(){
        return $this->belongsTo(Manajemen::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
