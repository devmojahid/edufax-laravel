<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'original_name' => $this->original_name,
            'filename' => $this->filename,
            'mime_type' => $this->mime_type,
            'size' => $this->size,
            'size_formatted' => $this->size_for_humans,
            'collection' => $this->collection,
            'meta' => $this->meta,
            'urls' => $this->when($this->isImage(), [
                'thumbnail' => $this->getUrl('thumbnail'),
                'medium' => $this->getUrl('medium'),
                'large' => $this->getUrl('large'),
                'original' => $this->getUrl(),
            ], [
                'original' => $this->getUrl(),
            ]),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
