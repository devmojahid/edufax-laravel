<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => 'required|file|max:10240', // 10MB max
            'path' => 'nullable|string',
            'collection' => 'nullable|string',
            'resize' => 'nullable|boolean',
            'optimize' => 'nullable|boolean',
            'meta' => 'nullable|array',
        ];
    }
}
