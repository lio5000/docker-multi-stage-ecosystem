<?php

use App\Http\Controllers\Api\MenuItemController;
use Illuminate\Support\Facades\Route;

Route::apiResource('menu-items', MenuItemController::class);