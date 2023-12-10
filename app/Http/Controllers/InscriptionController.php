<?php

namespace App\Http\Controllers;

use App\Enums\CountryType;
use App\Http\Requests\Inscription\InscriptionStep1Request;
use App\Http\Requests\Inscription\InscriptionStep2Request;
use App\Http\Requests\Inscription\InscriptionStep3Request;
use App\Models\Address;
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
            'step' => $this->getStep(),
            'address' => auth()->user()?->mainAddress
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

    public function step2(InscriptionStep2Request $request)
    {
        User::where('id', auth()->user()->id)->update([
            'type_id' => $request->input('type_id')
        ]);
        return redirect()->route('inscription');
    }

    public function step3(InscriptionStep3Request $request)
    {
        $address = Address::create([
            'main' => true,
            'user_id' => auth()->user()->id,
            'name' => $request->input('name'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'street' => $request->input('street'),
            'number' => $request->input('number'),
            'city' => $request->input('city'),
            'postal_code' => $request->input('postal_code'),
            'country_id' => CountryType::fromCode($request->input('country_code'))->value,
        ]);
        return redirect()->route('inscription');
    }
}
