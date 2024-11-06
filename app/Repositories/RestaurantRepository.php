<?php

namespace App\Repositories;

use App\Contracts\Repositories\RestaurantRepositoryInterface;
use App\Models\Restaurant;
use App\Support\BaseRepository;
use Illuminate\Support\Facades\DB;

class RestaurantRepository extends BaseRepository implements RestaurantRepositoryInterface
{
    protected function model(): string
    {
        return Restaurant::class;
    }

    public function findByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findFeatured()
    {
        return $this->model->where('is_featured', true)->get();
    }

    public function findNearby(float $latitude, float $longitude, int $radius = 5)
    {
        return $this->model
            ->select(DB::raw('*, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance'))
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->setBindings([$latitude, $longitude, $latitude])
            ->get();
    }
}
