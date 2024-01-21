<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\Front\Address\UpserAddressRequest;
use App\Models\Address;
use App\Models\User;

class AddressController extends Controller
{
    public function upsert(UpserAddressRequest $request, User $user, ?Address $address = null)
    {
        $main = $request->input('main');
        if($main) {
            Address::where('user_id', $user->id)->update(['main' => 0]);
        }
        if($address) {
            $address->refresh()->update([
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'street' => $request->input('street'),
                'number' => $request->input('number'),
                'city' => $request->input('city'),
                'postal_code' => $request->input('postal_code'),
                'complement' => $request->input('complement') ?? '',
                'name' => $request->input('name') ?? '',
                'main' => $main
            ]);
            return response()->json('updated');
        }
        $address = Address::create([
            'user_id' => $user->id,
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'street' => $request->input('street'),
            'number' => $request->input('number'),
            'city' => $request->input('city'),
            'postal_code' => $request->input('postal_code'),
            'complement' => $request->input('complement') ?? '',
            'name' => $request->input('name') ?? '',
            'main' => $main
        ]);
        return response()->json(['address' => $address]);
    }
}
