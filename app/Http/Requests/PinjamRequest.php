<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class PinjamRequest extends FormRequest
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
            'tgl_mulai' => 'required',
            'tgl_selesai' => 'required'
        ];
    }
}
