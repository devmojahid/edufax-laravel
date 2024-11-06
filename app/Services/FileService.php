<?php

namespace App\Services;

use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class FileService
{
    protected array $allowedMimeTypes = [
        'image' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'document' => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        'video' => ['video/mp4', 'video/mpeg', 'video/quicktime'],
    ];

    protected array $imageResizeConfigs = [
        'thumbnail' => ['width' => 150, 'height' => 150],
        'medium' => ['width' => 300, 'height' => 300],
        'large' => ['width' => 800, 'height' => 800],
    ];

    public function upload(
        UploadedFile $file,
        string $path = '',
        array $options = []
    ): File {
        $options = array_merge([
            'disk' => 'public',
            'collection' => null,
            'resize' => false,
            'optimize' => true,
            'meta' => [],
        ], $options);

        $filename = $this->generateFilename($file);
        $fullPath = $this->getFullPath($path, $filename);

        if ($this->isImage($file) && $options['resize']) {
            $this->handleImageUpload($file, $fullPath, $options);
        } else {
            Storage::disk($options['disk'])->putFileAs(
                $path,
                $file,
                $filename
            );
        }

        return File::create([
            'original_name' => $file->getClientOriginalName(),
            'filename' => $filename,
            'path' => $fullPath,
            'disk' => $options['disk'],
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'collection' => $options['collection'],
            'meta' => array_merge([
                'extension' => $file->getClientOriginalExtension(),
                'type' => $this->getFileType($file),
            ], $options['meta']),
        ]);
    }

    protected function handleImageUpload(UploadedFile $file, string $path, array $options): void
    {
        $image = Image::make($file);

        if ($options['optimize']) {
            $image->optimize();
        }

        foreach ($this->imageResizeConfigs as $size => $dimensions) {
            $resizedImage = clone $image;
            $resizedImage->fit($dimensions['width'], $dimensions['height']);

            $sizePath = str_replace(
                basename($path),
                $size . '_' . basename($path),
                $path
            );

            Storage::disk($options['disk'])->put(
                $sizePath,
                $resizedImage->encode()
            );
        }

        // Save original
        Storage::disk($options['disk'])->put(
            $path,
            $image->encode()
        );
    }

    protected function generateFilename(UploadedFile $file): string
    {
        return Str::uuid() . '.' . $file->getClientOriginalExtension();
    }

    protected function getFullPath(string $path, string $filename): string
    {
        return trim($path . '/' . $filename, '/');
    }

    protected function isImage(UploadedFile $file): bool
    {
        return in_array($file->getMimeType(), $this->allowedMimeTypes['image']);
    }

    protected function getFileType(UploadedFile $file): string
    {
        $mimeType = $file->getMimeType();

        foreach ($this->allowedMimeTypes as $type => $mimeTypes) {
            if (in_array($mimeType, $mimeTypes)) {
                return $type;
            }
        }

        return 'other';
    }

    public function delete(File $file): bool
    {
        if ($this->isImage($file->mime_type)) {
            foreach (array_keys($this->imageResizeConfigs) as $size) {
                $sizePath = str_replace(
                    basename($file->path),
                    $size . '_' . basename($file->path),
                    $file->path
                );
                Storage::disk($file->disk)->delete($sizePath);
            }
        }

        Storage::disk($file->disk)->delete($file->path);
        return $file->delete();
    }

    public function getUrl(File $file, string $size = null): string
    {
        if ($size && $this->isImage($file->mime_type)) {
            $path = str_replace(
                basename($file->path),
                $size . '_' . basename($file->path),
                $file->path
            );
        } else {
            $path = $file->path;
        }

        return Storage::disk($file->disk)->url($path);
    }
}

/*
File Upload controller example

// Create the product
$product = Product::create($request->only('name', 'description', 'price'));

// Handle file uploads and associate them with the product
if ($request->hasFile('thumbnail')) {
    FileService::uploadFiles([$request->file('thumbnail')], $product, 'thumbnail');
}

if ($request->hasFile('video')) {
    FileService::uploadFiles([$request->file('video')], $product, 'video');
}

if ($request->hasFile('gallery')) {
    FileService::uploadFiles($request->file('gallery'), $product, 'gallery');
}

if ($request->hasFile('files')) {
    FileService::uploadFiles($request->file('files'), $product, 'files');
}
*/
