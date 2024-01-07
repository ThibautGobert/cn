<?php

namespace App\Http\Requests\Front\Atelier;

use App\Enums\UserType;
use Illuminate\Foundation\Http\FormRequest;

class CreateAtelierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool)auth()->user() && in_array(auth()->user()->type_id, [UserType::AUCUN->value, UserType::ATELIER->value, UserType::CROQUEUR->value]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
