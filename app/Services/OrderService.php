<?php

namespace App\Services;

use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Support\BaseService;
use Illuminate\Support\Str;

class OrderService extends BaseService
{
    protected OrderRepositoryInterface $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        parent::__construct($orderRepository);
        $this->orderRepository = $orderRepository;
    }

    public function create(array $data): mixed
    {
        $data['order_number'] = $this->generateOrderNumber();
        return parent::create($data);
    }

    public function findByUser(int $userId)
    {
        return $this->orderRepository->findByUser($userId);
    }

    public function findByRestaurant(int $restaurantId)
    {
        return $this->orderRepository->findByRestaurant($restaurantId);
    }

    public function findByStatus(string $status)
    {
        return $this->orderRepository->findByStatus($status);
    }

    public function findByDateRange(string $startDate, string $endDate)
    {
        return $this->orderRepository->findByDateRange($startDate, $endDate);
    }

    protected function generateOrderNumber(): string
    {
        return strtoupper(date('Ymd') . Str::random(6));
    }
}
