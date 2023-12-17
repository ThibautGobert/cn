<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class UserPose extends Model
{
    use HasFactory, SoftDeletes, Userstamps;

    protected $fillable = ['user_id', 'pose_type_id'];
}
