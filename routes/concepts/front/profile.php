<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'profile'], function () {
    Route::get('{user}/show', [ProfileController::class, 'show'])->name('profile.show');
    Route::group(['middleware' => 'auth'], function () {
        Route::get('{user}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('{user}/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('{user}/updateAvatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');
    });
});
