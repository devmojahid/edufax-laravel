<?php

namespace App\Repositories;

use App\Models\Blog;
use App\Contracts\Repositories\BlogRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BlogsExport;
use App\Imports\BlogsImport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class BlogRepository implements BlogRepositoryInterface
{
    protected $model;

    public function __construct(Blog $model)
    {
        $this->model = $model;
    }

    public function getAllPaginated(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = $this->model->with('user');

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('content', 'like', "%{$filters['search']}%")
                    ->orWhereHas('user', function ($q) use ($filters) {
                        $q->where('name', 'like', "%{$filters['search']}%");
                    });
            });
        }

        if (!empty($filters['filters'])) {
            foreach ($filters['filters'] as $column => $value) {
                if ($value !== null && $value !== '') {
                    if ($column === 'published_at') {
                        $this->handleDateFilter($query, $value);
                    } else {
                        $query->where($column, $value);
                    }
                }
            }
        }

        if (!empty($filters['sort']) && !empty($filters['direction'])) {
            $query->orderBy($filters['sort'], $filters['direction']);
        } else {
            $query->latest('created_at');
        }

        return $query->paginate($perPage);
    }

    public function find(int $id): ?Blog
    {
        return $this->model->with('user')->findOrFail($id);
    }

    public function create(array $data): Blog
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
    }

    public function update(int $id, array $data): bool
    {
        return DB::transaction(function () use ($id, $data) {
            $blog = $this->find($id);
            return $blog->update($data);
        });
    }

    public function delete(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $blog = $this->find($id);
            return $blog->delete();
        });
    }

    public function toggleStatus(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $blog = $this->find($id);
            return $blog->update([
                'is_published' => !$blog->is_published,
                'published_at' => !$blog->is_published ? now() : null,
            ]);
        });
    }

    public function bulkDelete(array $ids): bool
    {
        return DB::transaction(function () use ($ids) {
            return $this->model->whereIn('id', $ids)->delete();
        });
    }

    public function export(string $format): mixed
    {
        $blogs = $this->model->with('user')->get();

        return match ($format) {
            'csv' => Excel::download(new BlogsExport($blogs), 'blogs.csv'),
            'xlsx' => Excel::download(new BlogsExport($blogs), 'blogs.xlsx'),
            'pdf' => PDF::loadView('exports.blogs', ['blogs' => $blogs])
                ->download('blogs.pdf'),
            default => throw new \InvalidArgumentException("Unsupported export format: {$format}"),
        };
    }

    public function import(mixed $file): bool
    {
        try {
            Excel::import(new BlogsImport, $file);
            return true;
        } catch (\Exception $e) {
            Log::error('Blog import failed: ' . $e->getMessage());
            return false;
        }
    }

    protected function handleDateFilter($query, $value): void
    {
        match ($value) {
            '7days' => $query->where('published_at', '>=', now()->subDays(7)),
            '30days' => $query->where('published_at', '>=', now()->subDays(30)),
            'this_month' => $query->whereMonth('published_at', now()->month)
                ->whereYear('published_at', now()->year),
            'last_month' => $query->whereMonth('published_at', now()->subMonth()->month)
                ->whereYear('published_at', now()->subMonth()->year),
            default => null,
        };
    }
}
