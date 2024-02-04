<?php

namespace App\Http\Controllers;

use App\Enums\StatutAtelierPropositionType;
use App\Enums\UserType;
use App\Http\Requests\Front\AtelierProposition\AtelierPropositionConfirmationUserRequest;
use App\Http\Requests\Front\AtelierProposition\ManageAtelierPropositionRequest;
use App\Mail\AtelierPropositionMail;
use App\Models\Atelier;
use App\Models\AtelierProposition;
use App\Models\User;
use App\Repositories\AtelierRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AtelierPropositionController extends Controller
{
    public function index(ManageAtelierPropositionRequest $request, Atelier $atelier)
    {
        return Inertia::render('AtelierProposition/Index', [
            'atelier' => $atelier->load('propositions.participant'),
            'modeles' => AtelierRepository::getUsersWithDistanceQuery($atelier, UserType::MODELE->value)->get(),
            'croqueurs' => AtelierRepository::getUsersWithDistanceQuery($atelier, UserType::CROQUEUR->value)->get(),
            'statutAtelierPropositionType' => StatutAtelierPropositionType::getAll()
        ]);
    }

    public function send(ManageAtelierPropositionRequest $request, Atelier $atelier, User $user)
    {
        try {
            $proposition = AtelierProposition::create([
                'atelier_id' => $atelier->id,
                'participant_id' => $user->id,
                'participant_statut_id' => StatutAtelierPropositionType::PENDING,
                'owner_statut_id' => StatutAtelierPropositionType::ACCEPTED,
            ]);
            Mail::send(new AtelierPropositionMail($atelier, $user, $proposition));
            $proposition->update(['mail_sent_at' => now()]);
            return response()->json([
                'propositions' => $atelier->propositions
            ]);
        }catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi d\'une proposition d\'atelier', [
                'atelier_id' => $atelier->id,
                'participant_id' => $user->id,
                'erreur' => $e->getMessage(),
            ]);
            return response()->json('ko', 422);
        }
    }

    public function confirm(ManageAtelierPropositionRequest $request, Atelier $atelier, AtelierProposition $proposition)
    {
        $proposition->update([
            'owner_statut_id' => StatutAtelierPropositionType::CONFIRMED
        ]);

        return response()->json([
            'propositions' => $atelier->propositions
        ]);
    }

    public function userConfirmation(
        AtelierPropositionConfirmationUserRequest $request,
        Atelier $atelier,
        AtelierProposition $proposition,
        User $user
    )
    {
        return Inertia::render('AtelierProposition/UserConfirmation', [
            'atelier' => $atelier->load('address', 'user'),
            'proposition' => $proposition,
            'user' => $user->load('main_address')
        ]);
    }
}
