<?php

namespace App\Enums;
use \App\Enums\EnumDescriptionAttribute as Description;
enum UserType: int
{
    use EnumTrait;
    #[Description('Modèle d\'art')]
    case MODELE = 1;
    #[Description('Artiste')]
    case ARTISTE = 2;
    #[Description('Atelier')]
    case ATELIER = 3;
}
