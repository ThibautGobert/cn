<?php

namespace App\Enums;
use \App\Enums\EnumDescriptionAttribute as Description;
enum StatutAtelierPropositionType: int
{
    use EnumTrait;

    #[Description('En attente')]
    case PENDING = 1;
    #[Description('Acceptée')]
    case ACCEPTED = 2;
    #[Description('Confirmée')]
    case CONFIRMED = 3;
    #[Description('Refusée')]
    case REFUSED = 4;
}
