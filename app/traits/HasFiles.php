<?php

namespace App\Traits;

use App\Models\File;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Collection;

trait HasFiles
{
    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable')->orderBy('order');
    }

    public function getFilesByCollection(string $collection): Collection
    {
        return $this->files()->where('collection', $collection)->get();
    }

    public function getFirstFileByCollection(string $collection): ?File
    {
        return $this->files()->where('collection', $collection)->first();
    }

    public function getFileUrl(string $collection, string $size = null): ?string
    {
        $file = $this->getFirstFileByCollection($collection);
        return $file ? $file->getUrl($size) : null;
    }

    public function syncFiles(array $fileIds, string $collection): void
    {
        $this->files()
            ->where('collection', $collection)
            ->whereNotIn('id', $fileIds)
            ->delete();

        File::whereIn('id', $fileIds)
            ->update([
                'fileable_type' => get_class($this),
                'fileable_id' => $this->id,
                'collection' => $collection,
            ]);
    }

    public function reorderFiles(string $collection, array $order): void
    {
        $files = $this->files()->where('collection', $collection)->get();

        foreach ($files as $file) {
            if (isset($order[$file->id])) {
                $file->update(['order' => $order[$file->id]]);
            }
        }
    }
}
