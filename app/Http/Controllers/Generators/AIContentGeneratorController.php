<?php

namespace App\Http\Controllers\Generators;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\RateLimiter;

class AIContentGeneratorController extends Controller
{
    /** @var ?array<mixed> */
    public ?array $responseRaw;
    public ?string $responseMessage;
    protected string $apiKey = '';
    protected string $model = 'gpt-3.5-turbo';
    protected string $temperature = '0.5';
    /** @var array<string> */
    protected array $allowedModels = [
        'gpt-3.5-turbo',
        'gpt-3.5-turbo-1106',
        'gpt-4',
        'gpt-4-vision-preview'
    ];
    /** @var string */
    protected string $contentQuery;
    /** @var string */
    protected string $endPoint = 'https://api.openai.com/v1/chat/completions';

    public function index(Request $request)
    {
        // Throttle requests to avoid hitting rate limits
        $key = 'openai-rate-limiter:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json(['error' => 'Too many requests. Try again later.'], 429);
        }

        RateLimiter::hit($key, 60); // Allows 5 attempts per minute

        $generatedText = null;
        if ($request->isMethod('POST')) {
            $request->validate([
                'text_prompt' => 'required|string',
                'model' => 'required|string|in:' . implode(',', $this->allowedModels),
            ]);

            $this->apiKey = config('configuration.openai_api_key');
            $this->model = $request->input('model');
            $this->contentQuery = $request->input('text_prompt');
            $this->temperature = $request->input('temperature');

            $generatedText = $this->callAIModel();
        }
        return Inertia::render('Backend/AI/Content/Generator/Index', [
            'generatedText' => $generatedText
        ]);
    }

    protected function callAIModel()
    {
        $response = Http::withToken($this->apiKey)
            ->acceptJson()
            ->retry(3, 1000)  // Retry 3 times, with 1-second intervals between retries
            ->post($this->endPoint, [
                "model" => $this->model,
                "messages" => [["role" => "user", "content" => $this->contentQuery]],
                "temperature" => $this->temperature,
            ]);

        return $response;
    }
}