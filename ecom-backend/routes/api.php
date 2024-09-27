<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show']);
Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index']);
Route::post('/cart/add', [\App\Http\Controllers\CartController::class, 'add']);
Route::post('/cart/remove', [\App\Http\Controllers\CartController::class, 'remove']);