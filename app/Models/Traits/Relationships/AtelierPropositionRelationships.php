<?php

namespace App\Models\Traits\Relationships;

use App\Models\Address;
use App\Models\Atelier;
use App\Models\AtelierProposition;
use App\Models\User;

trait AtelierPropositionRelationships
{
    public function participant()
    {
        return $this->hasOne(User::class, 'id', 'participant_id');
    }

    public function atelier()
    {
        return $this->hasOne(Atelier::class, 'id', 'atelier_id');
    }
}
