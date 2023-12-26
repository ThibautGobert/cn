<?php

namespace App\Http\Requests\Front\Address;

use Illuminate\Foundation\Http\FormRequest;

class UpserAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'latitude' => 'required',
            'longitude' => 'required',
            'street' => 'required',
            'number' => 'required',
            'city' => 'required',
            'postal_code' => 'required',
        ];
    }
}
