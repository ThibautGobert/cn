<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;
use ReflectionEnum;

enum Module: int
{
    use EnumTrait;

    #[Description('Administration')]
    case ADMINISTRATION = 3;
    #[Description('Utilisateurs')]
    case USER = 1;

    #[Description('Rôles')]
    case ROLE = 2;

    public static function getPermissionClass(int $value)
    {
        switch($value) {
            case Module::USER->value:
                return UserPermissionType::class;
            case Module::ROLE->value:
                return RolePermissionType::class;
            case Module::ADMINISTRATION->value:
                return AdministrationPermissionType::class;
        }
    }
}
