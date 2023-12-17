<?php

namespace App\Enums;

use App\Enums\EnumDescriptionAttribute as Description;

enum GenreType: int
{
    use EnumTrait;
    #[Description('Homme')]
    case HOMME = 1;

    #[Description('Femme')]
    case FEMME = 2;

    #[Description('Autre')]
    case AUTRE = 3;
}
