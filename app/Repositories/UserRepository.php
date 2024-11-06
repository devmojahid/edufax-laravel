<?php

namespace App\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;
use App\Support\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    protected function model(): string
    {
        return User::class;
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function findByRole(string $role)
    {
        return $this->model->role($role)->get();
    }

    public function attachRole(int $userId, string $role)
    {
        $user = $this->find($userId);
        return $user->assignRole($role);
    }

    public function detachRole(int $userId, string $role)
    {
        $user = $this->find($userId);
        return $user->removeRole($role);
    }
}
