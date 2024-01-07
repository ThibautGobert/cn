<?php

namespace App\Models;

use App\Models\Traits\Relationships\AtelierRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class Atelier extends Model
{
    use HasFactory,  SoftDeletes, Userstamps, AtelierRelationships;

    protected $fillable = ['user_id', 'address_id', 'pose_type_id', 'from', 'to', 'title', 'description', 'salaire' , 'deplacement', 'created_by', 'updated_by', 'deleted_by'];
}
