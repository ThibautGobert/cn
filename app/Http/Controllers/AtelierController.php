<?php

namespace App\Http\Controllers;

use App\Enums\PoseType;
use App\Http\Requests\Front\Atelier\CreateAtelierRequest;
use App\Http\Requests\Front\Atelier\ManageAtelierRequest;
use App\Http\Requests\Front\Atelier\StoreAtelierRequest;
use App\Models\Atelier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtelierController extends Controller
{
    public function index(ManageAtelierRequest $request)
    {
        return Inertia::render('Atelier/Index', [
            'pose_type' => PoseType::getAll(),
            'ateliers' => auth()->user()?->ateliers->load('address')
        ]);
    }

    public function create(CreateAtelierRequest $request)
    {
        return Inertia::render('Atelier/Create', [
            'pose_type' => PoseType::getAll(),
            'addresses' => auth()->user()->addresses
        ]);
    }

    public function store(StoreAtelierRequest $request)
    {
        $atelier = Atelier::create([
            'user_id' => auth()->user()->id,
            'title' => $request->input('title'),
            'from' => $request->input('date') . ' ' . $request->input('from'),
            'to' => $request->input('date') . ' ' . $request->input('to'),
            'address_id' => $request->input('address_id'),
            'pose_type_id' => $request->input('pose_type_id'),
            'description' => $request->input('description')
        ]);

        return redirect()->route('atelier.create')->withMessage(['type' => 'success', 'content' => 'Atelier créé avec succès !']);
    }
}
