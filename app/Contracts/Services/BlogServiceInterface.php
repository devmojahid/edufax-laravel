<?php

namespace App\Contracts\Services;

use App\Models\Blog;
use Illuminate\Pagination\LengthAwarePaginator;

interface BlogServiceInterface
{
    public function getAllPaginated(array $filters = [], int $perPage = 10): LengthAwarePaginator;
    public function find(int $id): ?Blog;
    public function create(array $data): Blog;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function toggleStatus(int $id): bool;
    public function bulkDelete(array $ids): bool;
    public function handleFiltering(array $params): array;
}
