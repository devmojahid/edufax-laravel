<?php

namespace App\Services;

use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Exception;

class FileService
{
    /**
     * Upload single or multiple files and associate them with a model.
     *
     * @param array $files
     * @param object $fileable
     * @param string|null $collectionName
     * @param int|null $userId
     * @return array
     */
    public static function uploadFiles(array $files, $fileable, $collectionName = null, $userId = null)
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            self::validateFile($file);

            $path = $file->store('uploads', 'public');
            $fileUrl = Storage::disk('public')->url($path);

            $uploadedFiles[] = File::create([
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'mime_type' => $file->getMimeType(),
                'file_type' => self::determineFileType($file->getMimeType()),
                'file_extension' => $file->getClientOriginalExtension(),
                'file_size' => $file->getSize(),
                'disk' => 'public',
                'collection_name' => $collectionName,
                'file_url' => $fileUrl,
                'fileable_id' => $fileable->id,
                'fileable_type' => get_class($fileable),
                'user_id' => $userId,
            ]);
        }

        return $uploadedFiles;
    }

    /**
     * Validate the file based on size and MIME type.
     *
     * @param object $file
     * @throws Exception
     */
    private static function validateFile($file)
    {
        $maxFileSize = 10240; // 10MB
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf'];

        if ($file->getSize() > $maxFileSize * 1024) {
            throw new Exception("File size exceeds the limit of $maxFileSize KB.");
        }

        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            throw new Exception("Invalid file type: " . $file->getMimeType());
        }
    }

    /**
     * Determine file type based on MIME type.
     *
     * @param string $mimeType
     * @return string
     */
    public static function determineFileType($mimeType)
    {
        if (strpos($mimeType, 'image') !== false) {
            return 'image';
        } elseif (strpos($mimeType, 'video') !== false) {
            return 'video';
        }

        return 'document';
    }

    /**
     * Delete a file based on its UUID.
     *
     * @param string $uuid
     * @return bool
     */
    public static function deleteFile($uuid)
    {
        $file = File::where('uuid', $uuid)->firstOrFail();

        if (Storage::disk($file->disk)->exists($file->file_path)) {
            Storage::disk($file->disk)->delete($file->file_path);
        }

        return $file->delete();
    }

    /**
     * Download a file based on its UUID.
     *
     * @param string $uuid
     * @return mixed
     */
    public static function downloadFile($uuid)
    {
        $file = File::where('uuid', $uuid)->firstOrFail();

        if (Storage::disk($file->disk)->exists($file->file_path)) {
            return Storage::disk($file->disk)->download($file->file_path, $file->file_name);
        }

        throw new Exception("File not found.");
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