<?php

namespace App\Models;

use App\Models\Traits\Relationships\AtelierPropositionRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class AtelierProposition extends Model
{
    use HasFactory, SoftDeletes, Userstamps, AtelierPropositionRelationships;

    protected $table = 'atelier_proposition';

    protected $fillable = ['atelier_id', 'participant_id', 'participant_statut_id', 'owner_statut_id', 'mail_sent_at', 'created_by', 'updated_by', 'deleted_by'];
}
