<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class LoginAsController extends Controller
{
    public function loginAs(Request $request, User $user)
    {
        session()->put('logged_as', true);
        session()->put('main_user', auth()->user());
        auth()->login($user);
        return redirect()->route('home')
            ->withMessage(['type' => 'success', 'content' => 'Connexion en tant que ' .$user->full_name.' réussie !']);
    }

    public function logoutAs(Request $request)
    {
        $mainUser = session()->get('main_user');
        session()->forget('main_user');
        session()->forget('logged_as');
        auth()->login($mainUser);
        return redirect()->route('home')
            ->withMessage(['type' => 'success', 'content' => 'Reconnexion en tant que ' . auth()->user()->full_name . ' réussie !']);
    }
}
