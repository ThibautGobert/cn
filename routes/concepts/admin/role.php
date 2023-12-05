<?php

use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'role'], function () {
    Route::get('/', [RoleController::class, 'index'])->name('admin.role.index');
    Route::get('/create', [RoleController::class, 'create'])->name('admin.role.create');
    Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('admin.role.edit');
    Route::delete('/{role}/delete', [RoleController::class, 'destroy'])->name('admin.role.delete');
});
