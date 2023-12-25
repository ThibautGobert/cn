<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageService
{
    public static function upsertAvatar(User $user, string $filePath, array $croppedAreaPixel)
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($filePath);

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
    }
}
