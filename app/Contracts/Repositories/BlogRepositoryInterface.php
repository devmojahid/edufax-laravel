<?php

namespace App\Contracts\Repositories;

use App\Models\Blog;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface BlogRepositoryInterface
{
    public function getAllPaginated(array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function find(int $id): ?Blog;
    public function create(array $data): Blog;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function toggleStatus(int $id): bool;
    public function bulkDelete(array $ids): bool;
    public function export(string $format): mixed;
    public function import(mixed $file): bool;
}
