<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('product')->get();
        return response()->json(['items' => $cartItems]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'productId' => 'required|exists:products,id',
        ]);

        $productId = $request->input('productId');
        $product = Product::findOrFail($productId);

        $cartItem = CartItem::where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'product_id' => $productId,
                'quantity' => 1,
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'item' => $cartItem->load('product')
        ], 201);
    }

    public function remove(Request $request)
    {
        $request->validate([
            'productId' => 'required|exists:products,id',
        ]);

        $productId = $request->input('productId');
        $cartItem = CartItem::where('product_id', $productId)->first();

        if ($cartItem) {
            if ($cartItem->quantity > 1) {
                $cartItem->quantity -= 1;
                $cartItem->save();
            } else {
                $cartItem->delete();
            }
        }

        return response()->json(['message' => 'Item removed from cart']);
    }
}