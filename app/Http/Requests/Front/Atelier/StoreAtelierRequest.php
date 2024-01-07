<?php

namespace App\Http\Requests\Front\Atelier;

use App\Enums\UserType;
use Illuminate\Foundation\Http\FormRequest;

class StoreAtelierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && in_array(auth()->user()->type_id, [UserType::AUCUN->value, UserType::ATELIER->value, UserType::CROQUEUR->value]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date|after:today',
            'from' => 'required|date_format:H:i',
            'to' => 'required|date_format:H:i'
        ];
    }

    public function messages(): array
    {
        return [
            'date.after' => 'La date de l\'atelier ne peut être antérieure ou égale au jour d\'aujourd\'hui',
        ];
    }
}
