<?php

namespace App\Imports;

use App\Models\Blog;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class BlogsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Blog([
            'title' => $row['title'],
            'slug' => $row['slug'] ?? Str::slug($row['title']),
            'content' => $row['content'],
            'user_id' => Auth::id() ?? 1,
            'is_published' => strtolower($row['status'] ?? '') === 'published',
            'published_at' => strtolower($row['status'] ?? '') === 'published' ? now() : null,
        ]);
    }
}
