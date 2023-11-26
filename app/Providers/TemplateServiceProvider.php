<?php

namespace App\Providers;

use App\Services\TemplateService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class TemplateServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(TemplateService::class, function (Application $app) {
            return new TemplateService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
