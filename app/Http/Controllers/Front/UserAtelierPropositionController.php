<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserAtelierPropositionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('UserAtelierAtelier/Index', [
            //'pose_type' => PoseType::getAll(),
            //'ateliers' => auth()->user()?->ateliers->load('address')
        ]);
    }
}
