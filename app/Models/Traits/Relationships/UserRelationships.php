<?php

namespace App\Models\Traits\Relationships;

use App\Models\Address;
use App\Models\UserPose;
use App\Models\UserPoseDemandee;
use App\Models\UserPoseProposee;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait UserRelationships
{
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'user_id', 'id');
    }

    public function mainAddress(): HasOne
    {
        return $this->hasOne(Address::class, 'user_id', 'id')->where('main', true);
    }

    public function poses(): HasMany
    {
        return $this->hasMany(UserPose::class, 'user_id', 'id');
    }
}
