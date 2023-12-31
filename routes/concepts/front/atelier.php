<?php

use App\Http\Controllers\AtelierController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'atelier'], function() {
    Route::get('/', [AtelierController::class, 'index'])->name('atelier.index');
    Route::get('/create', [AtelierController::class, 'create'])->name('atelier.create');
    Route::post('/store', [AtelierController::class, 'store'])->name('atelier.store');
});
