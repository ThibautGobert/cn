<?php

namespace App\Repositories;

use App\Models\Atelier;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AtelierRepository
{

    /**
     * La formule Haversine est une manière courante de calculer la distance la plus courte
     * entre deux points sur la surface d'une sphère en utilisant leurs latitudes et longitudes
     * exprimées en coordonnées angulaires.
     * https://fr.wikipedia.org/wiki/Formule_de_haversine#:~:text=La%20formule%20de%20haversine%20permet,de%20leurs%20longitudes%20et%20latitudes.
     *
     *
     * @param Atelier $atelier
     * @return Collection
     */
    public static function getUsersAround(Atelier $atelier): Collection
    {
        return User::query()
            ->join('address as a', function ($join) {
                $join->on('users.id', '=', 'a.user_id')
                    ->where('a.main', '=', 1)
                    ->whereNull('a.deleted_at');
            })
            ->join('ateliers as at', 'at.id', '=', DB::raw("?"))
            ->join('address as at_address', 'at_address.id', '=', 'at.address_id')
            ->selectRaw("
                users.*,
                (
                    6371 * acos( cos(radians(a.latitude))
                    * cos(radians(at_address.latitude))
                    * cos(radians(at_address.longitude)
                    - radians(a.longitude))
                    + sin(radians(a.latitude))
                    * sin(radians(at_address.latitude)) )
                ) AS distance_km"
            )->setBindings([$atelier->id])
            ->havingRaw('distance_km <= users.distance_max')
            ->get();
    }
}
