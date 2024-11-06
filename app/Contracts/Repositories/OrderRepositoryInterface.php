<?php

namespace App\Contracts\Repositories;

use App\Contracts\RepositoryInterface;

interface OrderRepositoryInterface extends RepositoryInterface
{
    public function findByUser(int $userId);
    public function findByRestaurant(int $restaurantId);
    public function findByStatus(string $status);
    public function findByDateRange(string $startDate, string $endDate);
}
