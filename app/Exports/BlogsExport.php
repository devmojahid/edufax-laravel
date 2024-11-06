<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class BlogsExport implements FromCollection, WithHeadings
{
    protected $blogs;

    public function __construct(Collection $blogs)
    {
        $this->blogs = $blogs;
    }

    public function collection()
    {
        return $this->blogs->map(function ($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'content' => $blog->content,
                'author' => $blog->user->name,
                'status' => $blog->is_published ? 'Published' : 'Draft',
                'published_at' => $blog->published_at?->format('Y-m-d H:i:s'),
                'created_at' => $blog->created_at->format('Y-m-d H:i:s'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'ID',
            'Title',
            'Slug',
            'Content',
            'Author',
            'Status',
            'Published At',
            'Created At',
        ];
    }
}
