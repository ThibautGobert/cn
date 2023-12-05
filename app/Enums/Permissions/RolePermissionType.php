<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum RolePermissionType : string
{
    use EnumTrait;

    #[Description('Gestion des rôles')]
    case MANAGE = 'gestion role';
    #[Description('Consulter les rôles')]
    case SHOW = 'consulter role';
    #[Description('Créer un rôle')]
    case CREATE = 'ajouter role';
    #[Description('Modifier un rôle')]
    case UPDATE = 'modifier role';
    #[Description('Supprimer un rôle')]
    case DELETE = 'supprimer role';
}
