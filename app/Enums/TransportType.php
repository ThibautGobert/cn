<?php

namespace App\Enums;

use App\Enums\EnumDescriptionAttribute as Description;

enum TransportType : int
{
    #[Description('Voiture')]
    case VOITURE = 1;
    #[Description('Transports en communs')]
    case TRANSPORT_EN_COMMUN = 2;
}
