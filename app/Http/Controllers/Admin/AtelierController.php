<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Services\SyncfucionDataService;

use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AtelierController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin::Atelier/Index', [

        ]);
    }

    public function search(Request $request)
    {
        $users = DB::table('users')->selectRaw("
            users.id,
            concat_ws('', users.firstname, users.lastname) as user_name,
            case
                when users.type_id = ? then ?
                when users.type_id = ? then ?
                when users.type_id = ? then ?
                when users.type_id = ? then ?
            end as user_type
        ", [
            UserType::AUCUN->value, UserType::getDescription(UserType::AUCUN->value),
            UserType::MODELE->value, UserType::getDescription(UserType::MODELE->value),
            UserType::CROQUEUR->value, UserType::getDescription(UserType::CROQUEUR->value),
            UserType::ATELIER->value, UserType::getDescription(UserType::ATELIER->value),
        ]);

        $query = DB::table('ateliers')
            ->join('users as u', 'u.id', '=', 'ateliers.user_id')
            ->join('address as a', 'a.id', '=', 'ateliers.address_id')
            ->joinSub($users, 'user_types', function (JoinClause $join) {
                $join->on('user_types.id', '=', 'u.id');
            })
        ->selectRaw("ateliers.*,
        user_types.user_name,
        user_types.user_type,
        DATE_FORMAT(ateliers.from, '%d/%m/%Y') as 'date',
        DATE_FORMAT(ateliers.from, '%H:%i') as 'from',
        DATE_FORMAT(ateliers.to, '%H:%i') as 'to',
        a.city
        ");

        return response()->json(SyncfucionDataService::search($request, $query, defaultOrderBy: 'ateliers.created_at', defaultDirection: 'desc'));
    }
}
