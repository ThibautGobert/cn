<?php

namespace App\Models\Traits\Relationships;

use App\Models\Address;
use App\Models\AtelierProposition;
use App\Models\User;

trait AtelierRelationships
{
    public function address()
    {
        return $this->hasOne(Address::class, 'id', 'address_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function propositions()
    {
        return $this->hasMany(AtelierProposition::class, 'atelier_id', 'id');
    }
}
