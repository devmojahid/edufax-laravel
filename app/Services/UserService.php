<?php

namespace App\Services;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Support\BaseService;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        parent::__construct($userRepository);
        $this->userRepository = $userRepository;
    }

    public function create(array $data): mixed
    {
        $data['password'] = Hash::make($data['password']);
        $user = parent::create($data);

        if (isset($data['roles'])) {
            foreach ($data['roles'] as $role) {
                $this->userRepository->attachRole($user->id, $role);
            }
        }

        return $user;
    }

    public function findByRole(string $role)
    {
        return $this->userRepository->findByRole($role);
    }

    public function findByEmail(string $email)
    {
        return $this->userRepository->findByEmail($email);
    }
}
