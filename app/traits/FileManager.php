<?php

namespace App\Traits;

use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait FileManager
{
    public function handleUploadedFile(
        UploadedFile $file,
        string $collection = null,
        array $meta = [],
        string $disk = 'public'
    ): File {
        $path = $this->generateFilePath($file);
        $filename = $this->generateFileName($file);

        // Store the file
        Storage::disk($disk)->putFileAs(
            $path,
            $file,
            $filename
        );

        // Create file record
        return File::create([
            'original_name' => $file->getClientOriginalName(),
            'filename' => $filename,
            'path' => $path . '/' . $filename,
            'disk' => $disk,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'fileable_type' => get_class($this),
            'fileable_id' => $this->id,
            'collection' => $collection,
            'meta' => $meta,
            'order' => $this->getNextFileOrder($collection),
        ]);
    }

    public function handleMultipleUploadedFiles(
        array $files,
        string $collection = null,
        array $meta = [],
        string $disk = 'public'
    ): array {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadedFiles[] = $this->handleUploadedFile($file, $collection, $meta, $disk);
            }
        }

        return $uploadedFiles;
    }

    protected function generateFilePath(UploadedFile $file): string
    {
        $baseFolder = class_basename($this);
        $date = now()->format('Y/m/d');
        return "uploads/{$baseFolder}/{$date}";
    }

    protected function generateFileName(UploadedFile $file): string
    {
        return Str::uuid() . '.' . $file->getClientOriginalExtension();
    }

    protected function getNextFileOrder(?string $collection): int
    {
        return $this->files()
            ->where('collection', $collection)
            ->max('order') + 1;
    }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function getFilesByCollection(string $collection)
    {
        return $this->files()->where('collection', $collection)->orderBy('order')->get();
    }

    public function deleteFile(File $file): bool
    {
        if (Storage::disk($file->disk)->exists($file->path)) {
            Storage::disk($file->disk)->delete($file->path);
        }

        return $file->delete();
    }

    public function deleteFiles(string $collection = null): bool
    {
        $files = $collection
            ? $this->getFilesByCollection($collection)
            : $this->files;

        $success = true;

        foreach ($files as $file) {
            if (!$this->deleteFile($file)) {
                $success = false;
            }
        }

        return $success;
    }
}
