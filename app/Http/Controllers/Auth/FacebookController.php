<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    public function redirectToFacebook()
    {
        //return Socialite::driver('facebook')->redirect();

        $redirectUrl = Socialite::driver('facebook')->redirect()->getTargetUrl();

        return response('', 409)->header('X-Inertia-Location', $redirectUrl);

    }

    public function handleFacebookCallback()
    {
        try {
            $socialiteUser = Socialite::driver('facebook')->user();

            $user = User::where('email', $socialiteUser->getEmail())->first();

            if (!$user) {
                $exploded = explode(' ', $socialiteUser->getName());
                $user = User::create([
                    'firstname' => $exploded[0] ?? null,
                    'lastname' => $exploded[1] ?? null,
                    'email' => $socialiteUser->getEmail(),
                ]);
            }

            // Connectez l'utilisateur
            Auth::login($user);
            return redirect('/')->withMessage(['type' => 'success', 'title' => 'Connexion réussie', 'content' => 'Heureux de vous revoir ' . auth()->user()->full_name]);
        }catch (\Exception $e) {
            return back()->withMessage(['type' => 'error', 'title' => 'Une erreur s\'est produite', 'content' => 'La connexion via Facebook n\'a pas fonctionné, veuillez réessayer plus tard']);
        }
    }
}
