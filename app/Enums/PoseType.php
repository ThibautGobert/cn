<?php

namespace App\Enums;

use App\Enums\EnumDescriptionAttribute as Description;

enum PoseType : int
{
    use EnumTrait;

    #[Description('Croquis')]
    case CROQUIS = 1;

    #[Description('Peinture')]
    case PEINTURE = 2;

    #[Description('Sculpture')]
    case SCULPTURE = 3;

    #[Description('Performence')]
    case PERFORMANCE = 4;

    #[Description('Photos')]
    case PHOTOS = 5;
}
