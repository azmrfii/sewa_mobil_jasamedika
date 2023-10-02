<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manajemen extends Model
{
    use HasFactory;

    protected $fillable = [
        'merek',
        'model',
        'nomor_plat',
        'tarif_sewa',
        'user_id',
        'status'
    ];

    public function pinjams()
    {
        return $this->hasMany(Pinjam::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
