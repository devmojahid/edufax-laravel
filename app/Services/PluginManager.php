<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class PluginManager
{
    protected $pluginPath = 'cms/plugins';

    public function getPlugins()
    {
        $plugins = [];
        $directories = File::directories(base_path($this->pluginPath));

        foreach ($directories as $dir) {
            $pluginJson = $dir . '/plugin.json';

            if (File::exists($pluginJson)) {
                $pluginData = json_decode(File::get($pluginJson), true);
                $pluginData['status'] = $this->isActive($pluginData['name']) ? 'active' : 'inactive';
                $plugins[] = $pluginData;
            }
        }

        return $plugins;
    }

    public function activate($pluginName)
    {
        $this->setPluginStatus($pluginName, true);

        // Fire event after plugin activation
        event('plugin.activated', $pluginName);
    }

    public function deactivate($pluginName)
    {
        $this->setPluginStatus($pluginName, false);

        // Fire event after plugin deactivation
        event('plugin.deactivated', $pluginName);
    }

    protected function setPluginStatus($pluginName, $status)
    {
        $activePlugins = config('cms.active_plugins', []);

        if ($status && !in_array($pluginName, $activePlugins)) {
            $activePlugins[] = $pluginName;
        } elseif (!$status) {
            $activePlugins = array_filter($activePlugins, function ($plugin) use ($pluginName) {
                return $plugin !== $pluginName;
            });
        }

        // Save the updated active plugin list to the CMS config or database
        config(['cms.active_plugins' => $activePlugins]);

        // Optionally persist to a database or config file.
    }

    public function isActive($pluginName)
    {
        $activePlugins = config('cms.active_plugins', []);
        return in_array($pluginName, $activePlugins);
    }
}