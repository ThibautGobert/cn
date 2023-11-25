<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use JetBrains\PhpStorm\NoReturn;

class PageController extends Controller
{
    public function home(Request $request)
    {
        //dd(UserType::getDescription(UserType::ATELIER->name));
        return Inertia::render('Home/Show', []);
    }

    public function agence(Request $request)
    {
        return Inertia::render('Agence/Show', []);
    }

    public function modeles(Request $request)
    {
        return Inertia::render('Modele/Show', []);
    }

    public function inscription(Request $request)
    {
        return Inertia::render('Inscription/Show', []);
    }
    public function connexion(Request $request)
    {
        return Inertia::render('Connexion/Show', []);
    }
}
