<?php

use App\Http\Controllers\AIConfigurationController;
use App\Http\Controllers\Generators\AIContentGeneratorController;
use App\Http\Controllers\PluginManagerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // user managment
    Route::resource('users', UserController::class)->except(['show']);

    Route::group(['prefix' => 'settings'], function () {
        Route::get("profile", function () {
            return Inertia::render('Backend/Settings/Profile/Index');
        });
        Route::get('account', function () {
            return Inertia::render('Backend/Settings/Account/Index');
        });
        Route::get('configurations', [AIConfigurationController::class, 'index']);
        Route::put('configurations', [AIConfigurationController::class, 'update'])->name('configurations.update');
    });

    Route::prefix('ai')->group(function () {
        Route::get('content-templates', function () {
            return Inertia::render('Backend/AI/Content/Templates/Index');
        });
        Route::get('writers', function () {
            return Inertia::render('Backend/AI/Writers/Index');
        });

        // content generator
        Route::match(['GET', "POST"], 'content-generator', [AIContentGeneratorController::class, 'index'])->name('content-generator.index');

        Route::get('image-generator', function () {
            return Inertia::render('Backend/AI/Image/Index');
        });

        Route::get('/companion', function () {
            return Inertia::render("Backend/AI/Companion/Index");
        });

        Route::get('/companion/{companion}', function ($companion) {
            return Inertia::render("Backend/AI/Companion/Single", ['companion' => $companion]);
        });
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Backend/Dashboard');
    })->name('dashboard');

    Route::get('/comming-soon', function () {
        return Inertia::render('Backend/CommingSoon/Index');
    });

    Route::get('/plugins', [PluginManagerController::class, 'index'])->name('plugins.index');

    Route::get('/all-gnerators', function () {
        return Inertia::render('Backend/Gnerators/Index');
    });
});

Route::get('/dashboard-2', function () {
    return Inertia::render('Backend/Dashboard2');
});

Route::get('/dashboard-3', function () {
    return Inertia::render('Backend/Dashboard3');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
