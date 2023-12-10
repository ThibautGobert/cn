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

    #[Description('Pays-Bas')]
    case HOLLANDE = 5;

    public static function fromCode(string $code): CountryType
    {
       switch ($code) {
           case 'be':
               return CountryType::BELGIQUE;
           case 'fr':
               return CountryType::FRANCE;
           case 'lu':
               return CountryType::LUXEMBOURG;
           case 'de':
               return CountryType::ALLEMAGNE;
           case 'nl':
               return CountryType::HOLLANDE;
       }
    }
}
