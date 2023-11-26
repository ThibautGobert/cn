<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

/**
 * Class UserTableSeeder.
 */
class AdminPermissionUpdateSeeder extends Seeder
{
    /**
     * Run the database seed.
     */
    public function run()
    {
        $role = \Spatie\Permission\Models\Role::where('name', 'administrateur')->first();
        $permissions = Permission::all();
        $role->syncPermissions($permissions);
        $this->command->info('Permissions mises à jour pour l\'administrateur');
    }
}
