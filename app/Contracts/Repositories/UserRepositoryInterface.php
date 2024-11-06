<?php

namespace App\Contracts\Repositories;

use App\Contracts\RepositoryInterface;

interface UserRepositoryInterface extends RepositoryInterface
{
    public function findByEmail(string $email);
    public function findByRole(string $role);
    public function attachRole(int $userId, string $role);
    public function detachRole(int $userId, string $role);
}
