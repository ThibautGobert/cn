<?php

namespace App\Models\Traits\Relationships;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait AddressRelationships
{
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
