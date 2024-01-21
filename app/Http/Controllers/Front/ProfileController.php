<?php

namespace App\Http\Controllers\Front;

use App\Enums\GenreType;
use App\Enums\PoseType;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request, User $user)
    {
        return Inertia::render('Profile/Show', [
            'user' => $user->load('main_address', 'poses')->append('type'),
            'poseType' => PoseType::getAll(),
            'genreType' => GenreType::getAll()
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, User $user): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $user->load('main_address', 'addresses', 'poses')->append('type'),
            'poseType' => PoseType::getAll(),
            'genreType' => GenreType::getAll()
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, User $user): RedirectResponse
    {
        $user->poses()->delete();
        $user->poses()->createMany(array_map(fn($poseId)=> ['pose_type_id' => $poseId], $request->input('poses')));
        $user->update([
            'genre_type_id' => $request->input('genre_type_id'),
            'about' => $request->input('about'),
            'birthday' => $request->input('birthday'),
            'distance_max' => $request->input('distance_max'),
        ]);

        return redirect()->route('profile.show', $user)->withMessage(['type' => 'success', 'title' => 'Profil mis à jour avec succès !']);
    }

    public function updateAvatar(ProfileUpdateRequest $request, User $user)
    {
        ImageService::upsertAvatar(
            $user,
            $request->input('image'),
            $request->input('croppedAreaPixel')
        );
        return response()->json('ok');
    }


    /**
     * Delete the user's account.
     */
    /*
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    */
}
