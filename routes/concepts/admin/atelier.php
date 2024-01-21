<?php

use App\Http\Controllers\Admin\AtelierController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=> 'atelier'], function() {
    Route::get('/', [AtelierController::class, 'index'])->name('admin.atelier.index');
    Route::post('search', [AtelierController::class, 'search'])->name('admin.atelier.search');
});
