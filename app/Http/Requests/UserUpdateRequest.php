<?php

namespace App\Http\Requests;

use App\Enums\Permissions\UserPermissionType;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can(UserPermissionType::SHOW->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'lastname' => 'required',
            'firstname' => 'required',
            'type_id' => 'required',
            'password_confirmation' => 'required_with:password|same:password',
        ];
    }

    public function messages()
    {
        return [
            'lastname' => 'Le champs nom est requis',
            'firstname' => 'Le champ prénom est requis',
            'type_id' => 'Le type d\'utilisateur est requis',
            'password_confirmation.required_with' => 'La confirmation de mot de passe est requise pour modifier le mot de passe',
            'password_confirmation.same' => 'La confirmation de mot de passe doit être identique au mot de passe',
        ];
    }
}
