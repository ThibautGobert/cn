<?php

namespace App\Enums;

enum ContratType : int
{
    case AMPLO = 1;
    case SMART = 2;
    case RPI = 3;
    case BENEVOLAT = 4;
    case AUCUN = 5;
    case AUTRE = 6;

    public static function getDescription(int $type) : string
    {
        return match ($type) {
            static::AMPLO => 'Contrat Amplo',
            static::SMART => 'Contrat Smart',
            static::RPI => 'RPI',
            static::BENEVOLAT => 'Bénévolat rémunéré',
            static::AUCUN => 'Aucun',
            static::AUTRE => 'Autre',
            default => throw new \Exception('Unexpected match value'),
        };
    }
}
