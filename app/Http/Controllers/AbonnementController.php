<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AbonnementController extends Controller
{
    public function index()
    {
        return Inertia::render('Abonnement/Index', [
        ]);
    }
}
