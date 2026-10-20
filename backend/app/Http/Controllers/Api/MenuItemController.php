<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Http\Requests\UpdateMenuItemRequest;
use App\Http\Resources\MenuItemResource;
use App\Models\MenuItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MenuItemController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        // Soporte para filtrar por categoría vía URL: ?category=Nombre
        $category = request()->query('category');
        $items = $category 
            ? MenuItem::where('category', 'like', "%{$category}%")->get() 
            : MenuItem::all();
            
        return MenuItemResource::collection($items);
    }

    public function store(StoreMenuItemRequest $request): JsonResponse
    {
        $item = MenuItem::create($request->validated());
        return (new MenuItemResource($item))
            ->additional(['message' => 'Platillo creado exitosamente'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(MenuItem $menuItem): MenuItemResource
    {
        return new MenuItemResource($menuItem);
    }

    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem): MenuItemResource
    {
        $menuItem->update($request->validated());
        return (new MenuItemResource($menuItem))
            ->additional(['message' => 'Platillo actualizado exitosamente']);
    }

    public function destroy(MenuItem $menuItem): JsonResponse
    {
        $menuItem->delete();
        return response()->json(['message' => 'Platillo eliminado exitosamente'], 200);
    }
}