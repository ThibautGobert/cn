<?php

namespace App\Http\Requests\Front\AtelierProposition;

use App\Exceptions\UnloggedException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;

class AtelierPropositionConfirmationUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $proposition = $this->route('proposition');

        return auth()->user() && auth()->user()->id === $proposition->participant_id;
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

    protected function failedAuthorization()
    {
        throw new UnloggedException('Non autorisé.');
    }
}
