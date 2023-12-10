<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inscription\InscriptionStep1Request;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class InscriptionController extends Controller
{
    public function show()
    {
        return Inertia::render('Inscription/Show', [
            'step' => $this->getStep()
        ]);
    }

    private function getStep(): int
    {
        if(!auth()->user()) return 1;
        return auth()->user()->inscription_step;
    }

    public function step1(InscriptionStep1Request $request)
    {
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('inscription');
    }

    public function step2(Request $request)
    {
        User::where('id', auth()->user()->id)->update([
            'type_id' => $request->input('type_id')
        ]);
        return redirect()->route('inscription');
    }
}
