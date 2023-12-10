<?php

namespace App\Models;

use App\Models\Traits\Relationships\AddressRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class Address extends Model
{
    use HasFactory, SoftDeletes, Userstamps, AddressRelationships;

    protected $table = 'address';

    protected $fillable = ['name', 'main', 'user_id', 'latitude', 'longitude', 'street', 'number', 'city', 'country_id', 'postal_code', 'complement'];
}
