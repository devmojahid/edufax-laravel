<?php

namespace App\Http\Controllers;

use App\Models\AiConfiguration;
use App\Services\ConfigurationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AiConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $details = AiConfiguration::where('user_id', Auth::user()->id)->first();
        return Inertia::render('Backend/Settings/AiConfiguration/Index', compact('details'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ConfigurationService $aiConfiguration)
    {
        $validate = $request->validate([
            'provider' => 'nullable|string',
            'api_key' => 'nullable|string',
            'api_secret' => 'nullable|string',
            'url' => 'nullable|string',
        ]);

        $aiConfiguration->updateData($validate, Auth::user()->id);

        return redirect()->back()->with('success', 'AI Configuration updated successfully');
    }
}
