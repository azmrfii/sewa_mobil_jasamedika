<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    protected $fillable = [
        'pinjam_id', 'biaya_sewa', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function pinjam()
    {
        return $this->belongsTo(Pinjam::class);
    }

}
