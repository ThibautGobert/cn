<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

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


    public function connexion(Request $request)
    {
        return Inertia::render('Connexion/Show', []);
    }
}
