<?php

use App\Http\Controllers\AbonnementController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=> 'abonnement'], function () {
    Route::get('/', [AbonnementController::class, 'index'])->name('abonnement.index');
});
