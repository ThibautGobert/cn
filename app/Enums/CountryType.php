<?php

namespace App\Enums;

use App\Enums\EnumDescriptionAttribute as Description;

enum CountryType : int
{
    use EnumTrait;

    #[Description('Belgique')]
    case BELGIQUE = 1;

    #[Description('France')]
    case FRANCE = 2;

    #[Description('Luxembourg')]
    case LUXEMBOURG = 3;

    #[Description('Allemagne')]
    case ALLEMAGNE = 4;

    #[Description('Hollande')]
    case HOLLANDE = 5;
}
