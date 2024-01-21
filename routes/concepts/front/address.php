<?php

use App\Http\Controllers\Front\AddressController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'address'], function () {
    Route::post('upsert/{user}/{address?}', [AddressController::class, 'upsert'])->name('address.upsert');
});
