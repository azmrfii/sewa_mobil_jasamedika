<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ManajemenRequest extends FormRequest
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
            'merek' => ['required'],
            'model' => ['required'],
            'nomor_plat' => ['required', Rule::unique('manajemens')->ignore($this->manajemen)],
            'tarif_sewa' => ['required']
        ];
    }
}
