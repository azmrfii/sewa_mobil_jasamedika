<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_plat', 'biaya_sewa', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
