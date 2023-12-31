<?php

namespace App\Enums;
use \App\Enums\EnumDescriptionAttribute as Description;
enum UserType: int
{
    use EnumTrait;

    #[Description('Aucun')]
    case AUCUN = 0;
    #[Description('Modèle d\'art')]
    case MODELE = 1;
    #[Description('Artiste / Croqueur')]
    case CROQUEUR = 2;
    #[Description('Atelier')]
    case ATELIER = 3;
}
