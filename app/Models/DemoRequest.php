<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemoRequest extends Model
{
    /** @use HasFactory<\Database\Factories\DemoRequestFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'college',
        'designation',
        'email',
        'phone',
        'students',
        'program',
        'message',
    ];
}
