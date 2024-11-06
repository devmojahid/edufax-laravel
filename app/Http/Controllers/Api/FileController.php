<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileUploadRequest;
use App\Http\Resources\FileResource;
use App\Services\FileService;
use Illuminate\Http\JsonResponse;
use App\Models\File;

class FileController extends Controller
{
    protected FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function store(FileUploadRequest $request): JsonResponse
    {
        try {
            $file = $this->fileService->upload(
                $request->file('file'),
                $request->input('path', 'uploads'),
                [
                    'collection' => $request->input('collection'),
                    'resize' => $request->boolean('resize', true),
                    'optimize' => $request->boolean('optimize', true),
                    'meta' => $request->input('meta', []),
                ]
            );

            return response()->json([
                'success' => true,
                'data' => new FileResource($file),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(File $file): JsonResponse
    {
        try {
            $this->fileService->delete($file);

            return response()->json([
                'success' => true,
                'message' => 'File deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
