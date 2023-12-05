<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum RoleType: string
{
    use EnumTrait;

     #[Description('Administrateur')]
     case ADMIN = 'administrateur';

     #[Description('Utilisateur')]
     case USER = 'utilisateur';

}
