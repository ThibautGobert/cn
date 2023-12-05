<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum UserPermissionType: string
{
    use EnumTrait;

     #[Description('Gestion des utilisateur')]
     case MANAGE = 'gestion utilisateurs';

     #[Description('Consultation utilisateur')]
     case SHOW = 'consulter utilisateur';

     #[Description('Création utilisateur')]
     case CREATE = 'ajouter utilisateur';

     #[Description('Modification utilisateur')]
     case UPDATE = 'modifier utilisateur';

     #[Description('Suppression utilisateur')]
     case DELETE = 'supprimer utilisateur';
}
