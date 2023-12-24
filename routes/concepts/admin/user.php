<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'user'], function () {
    Route::get('/', [UserController::class, 'index'])->name('admin.user.index');
    Route::post('/search', [UserController::class, 'search'])->name('admin.user.search');
    Route::get('/create', [UserController::class, 'create'])->name('admin.user.create');
    Route::post('/store', [UserController::class, 'store'])->name('admin.user.store');
    Route::get('/{user}/edit', [UserController::class, 'edit'])->name('admin.user.edit');
    Route::post('/{user}/update', [UserController::class, 'update'])->name('admin.user.update');
    Route::post('/{user}/delete', [UserController::class, 'destroy'])->name('admin.user.delete');
});
