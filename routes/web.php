<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\FacebookController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('auth/facebook', [FacebookController::class, 'redirectToFacebook'])->name('auth.facebook');
Route::group(['middleware' => 'inertia'], function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('/agence', [PageController::class, 'agence'])->name('agence');
    Route::get('/modeles', [PageController::class, 'modeles'])->name('modeles');
    Route::get('/inscription', [PageController::class, 'inscription'])->name('inscription');
    Route::get('/connexion', [PageController::class, 'connexion'])->name('connexion');

    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');



    Route::get('auth/facebook/callback', [FacebookController::class, 'handleFacebookCallback']);
});
/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});Uncaught (in promise) Error: Page not found: ./inertia/Pages/Dashboard/Show.jsx
    at resolvePageComponent (index.js:4:15)
    at resolve
*/
/*
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::group(['prefix' => 'admin'], function() {
        Route::get('dashboard', [DashboardController::class, 'show'])->name('admin.dashboard');
    });
});

require __DIR__ . '/auth.php';
