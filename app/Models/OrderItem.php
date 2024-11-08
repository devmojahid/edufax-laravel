<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'food_item_id',
        'food_item_variant_id',
        'quantity',
        'unit_price',
        'subtotal',
        'special_instructions',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function foodItem()
    {
        return $this->belongsTo(FoodItem::class);
    }

    public function foodItemVariant()
    {
        return $this->belongsTo(FoodItemVariant::class);
    }
}
