<?php

namespace App\Enums\Permissions;

use App\Enums\EnumDescriptionAttribute as Description;
use App\Enums\EnumTrait;

enum AdministrationPermissionType : string
{
    use EnumTrait;

    #[Description('Accès à l\'administration')]
    case MANAGE = 'access admin';
}
