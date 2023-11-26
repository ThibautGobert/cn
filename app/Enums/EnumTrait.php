<?php

namespace App\Enums;

use App\Enums\EnumDescriptionAttribute as Description;
use Attribute;
use Illuminate\Support\Collection;

use ReflectionClass;


trait EnumTrait
{
    public static function getAll(): Collection
    {
        $class = new ReflectionClass(__CLASS__);
        $res = [];

        foreach ($class->getConstants() as $key => $const) {
            $res[] = [
                'id' => $const->value,
                'libelle' => Description::getDescription(__CLASS__, $key)
            ];
        }

        return collect($res);
    }

    public static function getDescription(mixed $type): string
    {
        $class = new ReflectionClass(__CLASS__);
        foreach ($class->getConstants() as $key => $const) {
            if($const->value === $type) return Description::getDescription(__CLASS__, $key);
        }
        return '';
    }
}
