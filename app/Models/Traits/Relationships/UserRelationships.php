<?php

namespace App\Models\Traits\Relationships;

use App\Enums\UserType;
use App\Models\Address;
use App\Models\UserPose;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait UserRelationships
{
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'user_id', 'id')
                ->orderBy('main', 'desc');
    }

    public function main_address(): HasOne
    {
        return $this->hasOne(Address::class, 'user_id', 'id')->where('main', true);
    }

    public function poses(): HasMany
    {
        return $this->hasMany(UserPose::class, 'user_id', 'id');
    }
}
