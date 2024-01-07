<?php

namespace App\Enums;
use \App\Enums\EnumDescriptionAttribute as Description;
enum StatutUserAtelierType: int
{
    use EnumTrait;

    #[Description('Envoyée')]
    case SENT = 1;
    #[Description('Acceptée')]
    case ACCEPTED = 2;
    #[Description('Refusée')]
    case REFUSED = 3;
}
