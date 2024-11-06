<?php

use App\Http\Controllers\Api\FileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('files/upload', [FileController::class, 'store']);
    Route::delete('files/{file}', [FileController::class, 'destroy']);
    Route::post('files/reorder', [FileController::class, 'reorder']);
});
