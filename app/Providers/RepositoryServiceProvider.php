<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\BlogRepositoryInterface;
use App\Repositories\BlogRepository;
use App\Contracts\Services\BlogServiceInterface;
use App\Services\BlogService;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Blog Bindings
        $this->app->bind(BlogRepositoryInterface::class, BlogRepository::class);
        $this->app->bind(BlogServiceInterface::class, BlogService::class);
    }

    public function boot(): void
    {
        //
    }
}
