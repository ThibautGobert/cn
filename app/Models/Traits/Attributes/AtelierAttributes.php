<?php

namespace App\Models\Traits\Attributes;

use App\Enums\PoseType;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait AtelierAttributes
{
    public function pose() : Attribute
    {
        return Attribute::make(
            get: fn()=> $this->pose_type_id ? PoseType::getDescription(PoseType::from($this->pose_type_id)->value) : ''
        );
    }
}
