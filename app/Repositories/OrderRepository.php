<?php

namespace App\Repositories;

use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Models\Order;
use App\Support\BaseRepository;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    protected function model(): string
    {
        return Order::class;
    }

    public function findByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function findByRestaurant(int $restaurantId)
    {
        return $this->model->where('restaurant_id', $restaurantId)->get();
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByDateRange(string $startDate, string $endDate)
    {
        return $this->model
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
    }
}
