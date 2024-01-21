<?php

namespace App\Http\Controllers\Front;

use App\Enums\CountryType;
use App\Enums\PoseType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Inscription\InscriptionStep1Request;
use App\Http\Requests\Inscription\InscriptionStep2Request;
use App\Http\Requests\Inscription\InscriptionStep3Request;
use App\Http\Requests\Inscription\InscriptionStep4Request;
use App\Http\Requests\Inscription\InscriptionStep5Request;
use App\Models\Address;
use App\Models\User;
use App\Services\ImageService;
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
            'address' => auth()->user()?->main_address,
            'poseType' => PoseType::getAll()
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

    public function step4(InscriptionStep4Request $request, User $user)
    {
        $user->update(['distance_max' => $request->input('distance_max')]);
        return redirect()->route('inscription');
    }

    public function step5(InscriptionStep5Request $request, User $user)
    {
        $user->poses()->createMany(array_map(fn($poseId)=> ['pose_type_id' => $poseId], $request->input('poses')));
        return redirect()->route('inscription');
    }

    public function step6(Request $request, User $user)
    {
        ImageService::upsertAvatar(
            $user,
            $request->input('image'),
            $request->input('croppedAreaPixel')
        );
        /*
        $croppedAreaPixel = $request->input('croppedAreaPixel');
        $manager = new ImageManager(new Driver());
        $image = $manager->read($request->input('image'));

        $image->crop(
            $croppedAreaPixel['width'],
            $croppedAreaPixel['height'],
            $croppedAreaPixel['x'],
            $croppedAreaPixel['y']
        );

        $image->resize(300, 300);
        $image = $image->toJpeg(100);
        $path = '/image/' . $user->id . '/avatar/' . Str::random(40) . '.jpg';
        Storage::disk('public')->put($path, $image);

        if (Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }
        $user->update(['avatar' => '/storage'.$path]);
        */

        return redirect()->route('inscription');
    }

}
