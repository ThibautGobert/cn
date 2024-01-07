<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class UserAtelier extends Model
{
    use HasFactory,  SoftDeletes, Userstamps;

    protected $table = 'user_atelier';

    protected $fillable = ['user_id', 'atelier_id', 'statut_id', 'created_by', 'updated_by', 'deleted_by'];
}
