<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'dashboard'], function() {
    Route::get('/', [DashboardController::class, 'show'])->name('admin.dashboard');
});
