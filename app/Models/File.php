<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'file_name',
        'file_path',
        'mime_type',
        'file_type',
        'file_extension',
        'file_size',
        'disk',
        'collection_name',
        'file_url',
        'user_id',
        'fileable_id',
        'fileable_type'
    ];

    protected static function booted()
    {
        static::creating(function ($file) {
            $file->uuid = (string) Str::uuid();
        });
    }

    /**
     * Get the owning fileable model (product, user, etc.).
     */
    public function fileable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user who uploaded the file.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}