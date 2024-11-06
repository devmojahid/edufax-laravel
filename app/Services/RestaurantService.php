<?php

namespace App\Services;

use App\Contracts\Repositories\RestaurantRepositoryInterface;
use App\Support\BaseService;
use Illuminate\Support\Str;

class RestaurantService extends BaseService
{
    protected RestaurantRepositoryInterface $restaurantRepository;

    public function __construct(RestaurantRepositoryInterface $restaurantRepository)
    {
        parent::__construct($restaurantRepository);
        $this->restaurantRepository = $restaurantRepository;
    }

    public function create(array $data): mixed
    {
        $data['slug'] = Str::slug($data['name']);
        return parent::create($data);
    }

    public function findByUser(int $userId)
    {
        return $this->restaurantRepository->findByUser($userId);
    }

    public function findByStatus(string $status)
    {
        return $this->restaurantRepository->findByStatus($status);
    }

    public function findFeatured()
    {
        return $this->restaurantRepository->findFeatured();
    }

    public function findNearby(float $latitude, float $longitude, int $radius = 5)
    {
        return $this->restaurantRepository->findNearby($latitude, $longitude, $radius);
    }
}
