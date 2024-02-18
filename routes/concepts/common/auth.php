<?php

use App\Http\Controllers\Auth\LoginAsController;
use Illuminate\Support\Facades\Route;

Route::get('/loginAs/{user}', [LoginAsController::class, 'loginAs'])->name('auth.loginAs');
Route::get('/logoutAs', [LoginAsController::class, 'logoutAs'])->name('auth.logoutAs');
