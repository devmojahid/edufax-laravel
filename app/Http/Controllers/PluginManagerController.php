<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PluginManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Inertia\Response
     */
    public function index()
    {
        return inertia('Backend/Plugins/Index', [
            'plugins' => [],
            // 'plugins' => plugin_manager()->getPlugins(),
        ]);
    }
}