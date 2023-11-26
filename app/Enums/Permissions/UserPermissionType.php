<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum UserPermissionType: string
{
    use EnumTrait;

     #[Description('Gestion des utilisateur')]
     case MANAGE = 'manage user';

     #[Description('Consultation utilisateur')]
     case SHOW = 'show user';

     #[Description('Création utilisateur')]
     case CREATE = 'create user';

     #[Description('Modification utilisateur')]
     case UPDATE = 'update user';

     #[Description('Suppression utilisateur')]
     case DELETE = 'delete user';
}
