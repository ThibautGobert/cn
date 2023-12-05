<?php

namespace Database\Seeders;

use App\Enums\Permissions\Module;
use App\Enums\Permissions\RoleType;
use App\Enums\Permissions\UserPermissionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use ReflectionEnum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        resolve(PermissionRegistrar::class)->forgetCachedPermissions();
        $enumCases = (new ReflectionEnum(Module::class))->getCases();
        foreach ($enumCases as $module) {
            $moduleId = $module->getValue()->value;
            $permissionClass = Module::getPermissionClass($moduleId);
            $permissionEnum = (new ReflectionEnum($permissionClass));
            $permissionCases = $permissionEnum->getCases();
            foreach($permissionCases as $reflexionCase) {
                $permission = $reflexionCase->getValue()->value;
                $getDescription = $permissionEnum->getMethod('getDescription');
                if(!Permission::where(['name' => $permission,  'module_id' => $moduleId])->first()) {
                    Permission::create(['name' => $permission, 'module_id' => $moduleId]);
                    $this->command->info('Permission '.$getDescription->invoke(null, $permission).' ajoutées pour le module '. Module::getDescription($moduleId));
                }
            }
        }
        $enumCases = (new ReflectionEnum(RoleType::class))->getCases();
        foreach ($enumCases as $roleCase) {
            $role = $roleCase->getValue()->value;
            if(!Role::where('name', $role)->first()) {
                Role::create(['name' => $role]);
            }
        }
        $this->call(AdminPermissionUpdateSeeder::class);
    }
}
