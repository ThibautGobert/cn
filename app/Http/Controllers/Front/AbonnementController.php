<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AbonnementController extends Controller
{
    public function index()
    {
        return Inertia::render('Abonnement/Index', [
        ]);
    }
}
