<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\AIConfigurationController;
use App\Http\Controllers\Generators\AIContentGeneratorController;
use App\Http\Controllers\PluginManagerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingsController;
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

// Route::middleware(['auth', 'verified'])->group(function () {
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

Route::get('admin/dashboard', function () {
    return Inertia::render('Backend/Dashboard');
})->name('dashboard');

Route::get('/comming-soon', function () {
    return Inertia::render('Backend/CommingSoon/Index');
});

Route::get('/plugins', [PluginManagerController::class, 'index'])->name('plugins.index');

Route::get('/all-gnerators', function () {
    return Inertia::render('Backend/Gnerators/Index');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::any('blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::resource('blogs', BlogController::class)->except(['index']);
    Route::put('blogs/{id}/toggle-status', [BlogController::class, 'toggleStatus'])->name('blogs.toggle-status');
    Route::delete('blogs/bulk-delete', [BlogController::class, 'bulkDelete'])->name('blogs.bulk-delete');
    Route::post('blogs/export', [BlogController::class, 'export'])->name('blogs.export');
    Route::post('blogs/import', [BlogController::class, 'import'])->name('blogs.import');
});
// });

Route::get('/admin/settings', function () {
    return Inertia::render('Backend/Settings/Index');
});

Route::get('/drafts/product-form', function () {
    return Inertia::render('Drafts/product-form');
});

Route::get('/drafts/settings', function () {
    return Inertia::render('Drafts/settings');
});

Route::prefix('drafts')->name('drafts.')->group(function () {
    Route::get('product-create', function () {
        return Inertia::render('Drafts/product-create');
    })->name('products.create');

    Route::match(['get', 'post'], 'product-list', [ProductController::class, 'index'])->name('products.index');
    Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete'])->name('products.bulk-delete');
    Route::post('products/export', [ProductController::class, 'export'])->name('products.export');
    Route::post('products/export-pdf', [ProductController::class, 'exportPDF'])->name('products.export-pdf');
    Route::post('products/import', [ProductController::class, 'import'])->name('products.import');
});


Route::get('/dashboard-3', function () {
    return Inertia::render('Backend/Dashboard3');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/products/export', [ProductController::class, 'export'])->name('products.export');
    Route::get('/products/export-pdf', [ProductController::class, 'exportPDF'])->name('products.export-pdf');
    Route::post('/products/import', [ProductController::class, 'import'])->name('products.import');
    Route::delete('/products/bulk-delete', [ProductController::class, 'bulkDelete'])
        ->name('products.bulk-delete');
});

// Settings Routes
Route::prefix('admin/settings')->name('admin.settings.')->group(function () {
    // Route::get('/', [SettingsController::class, 'index'])->name('index');
    // Route::get('/', [SettingsController::class, 'index'])->name('index');
    Route::get('/store', function () {
        //
    })->name('store');
    // Route::post('/store/update', [SettingsController::class, 'storeUpdate'])->name('store.update');
    // Route::get('/profile', [SettingsController::class, 'profile'])->name('profile');
    Route::get('/profile', function () {
        //
    })->name('profile');
    // Route::post('/profile/update', [SettingsController::class, 'profileUpdate'])->name('profile.update');
    // Route::get('/email', [SettingsController::class, 'email'])->name('email');
    Route::get('/email', function () {
        return Inertia::render('Backend/Settings/Email/Index');
    })->name('email');
    // Route::post('/email/update', [SettingsController::class, 'emailUpdate'])->name('email.update');
    // Route::get('/security', [SettingsController::class, 'security'])->name('security');
    Route::get('/security', function () {
        //
    })->name('security');
    // Route::post('/security/update', [SettingsController::class, 'securityUpdate'])->name('security.update');
    // Route::get('/localization', [SettingsController::class, 'localization'])->name('localization');
    Route::get('/localization', function () {
        //
    })->name('localization');

    Route::get('/theme', function () {
        //
    })->name('theme');
    Route::get('/display', function () {
        //
    })->name('display');
    Route::get('/payments', function () {
        //
    })->name('payments');
    Route::get('/shipping', function () {
        //
    })->name('shipping');
    Route::get('/taxes', function () {
        //
    })->name('taxes');
    Route::get('/media', function () {
        //
    })->name('media');
    Route::get('/seo', function () {
        //
    })->name('seo');
    Route::get('/google', function () {
        //
    })->name('google');
    Route::get('/social', function () {
        //
    })->name('social');
    Route::get('/api', function () {
        //
    })->name('api');
    Route::get('/cache', function () {
        //
    })->name('cache');
    Route::get('/logs', function () {
        //
    })->name('logs');
    Route::get('/notifications', function () {
        //
    })->name('notifications');
    // Route::post('/localization/update', [SettingsController::class, 'localizationUpdate'])->name('localization.update');
    // Add more routes as needed
});

require __DIR__ . '/auth.php';

// Add this with your other blog routes
Route::delete('blogs/bulk-delete', [BlogController::class, 'bulkDelete'])->name('admin.blogs.bulk-delete');