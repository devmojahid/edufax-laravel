<?php

namespace App\Contracts;

interface RepositoryInterface
{
    public function all();
    public function find(int $id);
    public function findByField(string $field, mixed $value);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function with(array $relations);
}
