<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Atelier;
use App\Repositories\AtelierRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(Request $request)
    {
        $atelier = Atelier::find(1);
        //$users = AtelierRepository::getUsersAround($atelier);
        //dd($users);
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
