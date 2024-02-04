<?php

namespace App\Http\Requests\Front\AtelierProposition;

use Illuminate\Foundation\Http\FormRequest;

class ManageAtelierPropositionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $atelier = $this->route('atelier');

        return auth()->user() && auth()->user()->id === $atelier->user_id;
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
