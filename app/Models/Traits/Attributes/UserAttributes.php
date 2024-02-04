<?php

namespace App\Models\Traits\Attributes;

use App\Enums\UserType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

trait UserAttributes
{
    public function fullName() : Attribute
    {
        return Attribute::make(
            get: fn()=> $this->firstname .' '. $this->lastname
        );
    }

    public function limitedFullName(): Attribute
    {
        return Attribute::make(
            get: fn()=> $this->firstname .' '. Str::limit($this->lastname, 1, '.')
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
                if(auth()->user()->addresses->count() === 0)return 3;
                if(auth()->user()->type_id === UserType::MODELE->value && !auth()->user()->distance_max) return 4;
                if(auth()->user()->poses->count() === 0) return 5;
                if(!auth()->user()->avatar || auth()->user()->avatar === '/images/default.png') return 6;
                return 7;
            }
        );
    }

    public function inscriptionDone(): Attribute
    {
        return Attribute::make(
            get: fn()=> $this->inscription_step === 7
        );
    }
}
