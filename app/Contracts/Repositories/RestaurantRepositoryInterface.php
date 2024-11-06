<?php

namespace App\Contracts\Repositories;

use App\Contracts\RepositoryInterface;

interface RestaurantRepositoryInterface extends RepositoryInterface
{
    public function findByUser(int $userId);
    public function findByStatus(string $status);
    public function findFeatured();
    public function findNearby(float $latitude, float $longitude, int $radius = 5);
}
