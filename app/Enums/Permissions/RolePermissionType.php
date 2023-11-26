<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum RolePermissionType : string
{
    use EnumTrait;

    #[Description('Gestion des rôles')]
    case MANAGE = 'manage role';
    #[Description('Consulter les rôles')]
    case SHOW = 'show role';

    #[Description('Créer un rôle')]
    case CREATE = 'create role';
    #[Description('Modifier un rôle')]
    case UPDATE = 'update role';
    #[Description('Supprimer un rôle')]
    case DELETE = 'delete role';
}
