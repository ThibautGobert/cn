<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Permissions\Module;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin::Role/Index', [
            'roles' => Role::orderBy('name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin::Role/Create', []);
    }

    public function edit(Role $role)
    {
        return Inertia::render('Admin::Role/Edit', [
            'role' => $role->load('permissions'),
            'permissions' => Permission::all(),
            'modules' => Module::getAll(),
        ]);
    }
}
