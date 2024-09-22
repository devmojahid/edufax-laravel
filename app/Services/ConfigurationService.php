<?php

namespace App\Services;

use App\Models\AiConfiguration;
use App\Models\User;

class ConfigurationService
{
    public function updateData(array $data, $id)
    {
        // create or update AI configuration for user
        $aiConfiguration = AiConfiguration::updateOrCreate(
            ['user_id' => $id],
            $data
        );

        return $aiConfiguration;
    }
}
