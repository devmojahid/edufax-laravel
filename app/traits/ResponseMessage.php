<?php

namespace App\Traits;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

trait ResponseMessage
{
    protected $defaultSuccessMessage = 'Operation successful';
    protected $defaultErrorMessage = 'An error occurred';

    public function response(array $data, bool $status, int $statusCode = 200): JsonResponse|RedirectResponse|Response
    {
        if (!is_array($data)) {
            $data = [$data];
        }

        if (request()->inertia()) {
            return Inertia::render('Message', [
                'status' => $status ? 'success' : 'error',
                'data' => $data
            ]);
        }

        if (request()->ajax() || request()->isJson()) {
            return response()->json(
                [
                    'status' => $status,
                    'data' => $data
                ],
                $statusCode
            );
        }

        if (!empty($data['redirect'])) {
            return redirect()->to($data['redirect']);
        }

        $data['status'] = $status ? 'success' : 'error';
        $back = back()->withInput()->with($data);

        if (!$status && !empty($data['message'])) {
            $back->withErrors([$data['message']]);
        }

        return $back;
    }

    public function success(string|array $message = null, int $statusCode = 200): JsonResponse|RedirectResponse|Response
    {
        if (is_string($message)) {
            $message = ['message' => $message];
        }

        if (is_null($message)) {
            $message = ['message' => $this->defaultSuccessMessage];
        }

        return $this->response($message, true, $statusCode);
    }

    public function error(string|array $message = null, int $statusCode = 400): JsonResponse|RedirectResponse|Response
    {
        if (is_string($message)) {
            $message = ['message' => $message];
        }

        if (is_null($message)) {
            $message = ['message' => $this->defaultErrorMessage];
        }

        Log::error('Error response', $message);

        return $this->response($message, false, $statusCode);
    }

    public function validationError(array $errors, string $message = 'Validation errors occurred'): JsonResponse|RedirectResponse|Response
    {
        $response = [
            'message' => $message,
            'errors' => $errors
        ];

        return $this->response($response, false, 422);
    }

    public function customResponse(array $data, int $statusCode): JsonResponse|RedirectResponse|Response
    {
        $status = $statusCode >= 200 && $statusCode < 300;
        return $this->response($data, $status, $statusCode);
    }
}