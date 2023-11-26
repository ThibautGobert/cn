<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserTableSeeder.
 */
class UserSeeder extends Seeder
{
    /**
     * Run the database seed.
     */
    public function run()
    {
        if($this->command->askWithCompletion('Souhaitez vous créer un utilisateur (yes, no)?', [
            'yes', 'no'], 'no') === 'yes') {
            $firstName = $this->command->ask('Prénom', 'admin');
            $lastName = $this->command->ask('Prénom', 'admin');
            $email = $this->command->ask('Email', 'admin@admin.com');
            $password = $this->command->ask("Password", 'admin');
            $user = User::where('email', $email)->first();
            if($user) {
                $this->command->info('Un utilisateur avec cette adresse email existe déjà !');
                return;
            }

            $user = User::create([
                'lastname' => $lastName,
                'firstname' => $firstName,
                'email' => $email,
                'password' => Hash::make($password),
            ]);


            $role = \Spatie\Permission\Models\Role::where('name', 'administrateur')->first();
            if(!$role) {
                $role = \Spatie\Permission\Models\Role::create([
                    'name' => 'administrateur',
                    'guard_name' => 'web',
                ]);
            }

            $user->assignRole('administrateur');
        }

    }
}
