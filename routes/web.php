<?php

use App\Http\Controllers\bookafree;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::post('/', [bookafree::class, 'submitform'])->name('demo.submit');
