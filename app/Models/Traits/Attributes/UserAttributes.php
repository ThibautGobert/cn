<?php

namespace App\Models\Traits\Attributes;

use App\Enums\UserType;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait UserAttributes
{
    public function fullName() : Attribute
    {
        return Attribute::make(
            get: fn()=> $this->firstname .' '. $this->lastname
        );
    }

    public function isAdmin(): Attribute
    {
        return Attribute::make(
            get: fn()=> $this->hasRole('administrateur')
        );
    }

    public function type() : Attribute
    {
        return Attribute::make(
            get: fn()=> UserType::getDescription($this->type_id)
        );
    }

    public function inscriptionStep(): Attribute
    {
        return Attribute::make(
            get: function () {
                if(!auth()->user()->type_id) return 2;
                return 3;
            }
        );
    }

    public function inscriptionDone(): Attribute
    {
        return Attribute::make(
            get: fn()=> $this->inscription_step === 3
        );
    }
}
