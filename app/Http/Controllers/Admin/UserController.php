<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Permissions\Module;
use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Services\SyncfucionDataService;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin::User/Index', [
            'userType' => UserType::getAll()
        ]);
    }

    public function search(Request $request)
    {
        $users = DB::table('users')->selectRaw("
            users.id,
            case
                when users.type_id = ? then ?
                when users.type_id = ? then ?
                when users.type_id = ? then ?
                when users.type_id = ? then ?
            end as type
        ", [
            UserType::AUCUN->value, UserType::getDescription(UserType::AUCUN->value),
            UserType::MODELE->value, UserType::getDescription(UserType::MODELE->value),
            UserType::ARTISTE->value, UserType::getDescription(UserType::ARTISTE->value),
            UserType::ATELIER->value, UserType::getDescription(UserType::ATELIER->value),
        ]);

        $query = User::query()->joinSub($users, 'user_types', function (JoinClause $join) {
            $join->on('user_types.id', '=', 'users.id');
        });

        return response()->json(SyncfucionDataService::search($request, $query));
    }

    public function create()
    {
        return Inertia::render('Admin::User/Create', [
            'permissions' => Permission::all(),
            'roles' => Role::all(),
            'modules' => Module::getAll(),
            'userType' => UserType::getAll()
        ]);
    }

    public function store(UserCreateRequest $request)
    {
        $fields = $request->except('password', 'permissions', 'roles');

        $fields = array_merge($fields, [
            'password' => Hash::make($request->input('password'))
        ]);

        $user = User::create($fields);
        $user->permissions()->sync($request->input('permissions'));
        $user->roles()->sync($request->input('roles'));

        return to_route('admin.user.edit', $user->id)->withMessage(['type' => 'success', 'content' => 'Utilisateur mis à jour avec succès !']);
    }

    public function edit(Request $request, User $user)
    {
        return Inertia::render('Admin::User/Edit', [
            'user' => $user->append('full_name')->load('permissions', 'roles.permissions'),
            'permissions' => Permission::all(),
            'roles' => Role::all(),
            'modules' => Module::getAll(),
            'userType' => UserType::getAll()
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $fields = $request->except('password', 'permissions', 'roles');
        if($request->filled('password')) {
            $fields = array_merge($fields, [
                'password' => Hash::make($request->input('password'))
            ]);
        }
        $user->update($fields);
        $user->permissions()->sync($request->input('permissions'));
        $user->roles()->sync($request->input('roles'));

        return to_route('admin.user.index')->withMessage(['type' => 'success', 'content' => 'Utilisateur mis à jour avec succès !']);
    }
}
