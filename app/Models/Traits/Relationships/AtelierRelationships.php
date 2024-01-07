<?php

namespace App\Models\Traits\Relationships;

use App\Models\Address;

trait AtelierRelationships
{
    public function address()
    {
        return $this->hasOne(Address::class, 'id', 'address_id');
    }
}
