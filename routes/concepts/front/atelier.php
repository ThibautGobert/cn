<?php

use App\Http\Controllers\AtelierPropositionController;
use App\Http\Controllers\Front\AtelierController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'atelier'], function() {
    Route::get('/', [AtelierController::class, 'index'])->name('atelier.index');
    Route::get('/create', [AtelierController::class, 'create'])->name('atelier.create');
    Route::get('/{atelier}/edit', [AtelierController::class, 'edit'])->name('atelier.edit');
    Route::post('/store', [AtelierController::class, 'store'])->name('atelier.store');
    Route::get('/{atelier}/show', [AtelierController::class, 'show'])->name('atelier.show');

    Route::get('/{atelier}/proposition', [AtelierPropositionController::class, 'index'])->name('atelier.proposition.index');
    Route::post('/{atelier}/proposition/{user}/send', [AtelierPropositionController::class, 'send'])->name('atelier.proposition.send');
    Route::post('/{atelier}/proposition/{proposition}/confirm', [AtelierPropositionController::class, 'confirm'])->name('atelier.proposition.confirm');
    Route::post('/proposition/{proposition}/accept', [AtelierPropositionController::class, 'accept'])->name('atelier.proposition.accept');
    Route::post('/proposition/{proposition}/refuse', [AtelierPropositionController::class, 'refuse'])->name('atelier.proposition.refuse');

    Route::get('/{atelier}/confirmation/{proposition}/{user}', [AtelierPropositionController::class, 'showUserConfirmation'])->name('atelier.proposition.showUserConfirmation');
});
