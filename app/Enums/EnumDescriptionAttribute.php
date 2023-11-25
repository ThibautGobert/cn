<?php

namespace App\Enums;

use Attribute;
use ReflectionClassConstant;

#[Attribute]
class EnumDescriptionAttribute
{
    public function __construct(public string $description)
    {}

    public static function getDescription(string $className, string $constName): string
    {
        $refConst = new ReflectionClassConstant($className, $constName);
        $attributes = $refConst->getAttributes(self::class);
        return $attributes ? $attributes[0]->newInstance()->description : '';
    }
}
