<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AiConfiguration extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'provider',
        'api_key',
        'api_secret',
        'url',
        'status',
        'user_id',
        'deleted_at',
    ];

    /**
     * Get the user that owns the AI configuration.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}