<?php

namespace App\Http\Middleware;

use App\Services\TemplateService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'layouts.inertia';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $templateService = app(TemplateService::class);
        return [
            ...parent::share($request),
            'csrf_token' => csrf_token(),
            'auth' => [
                'user' => $request->user()?->append(['full_name', 'is_admin']),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarItems' => $templateService::getSideBarItems(config('template.sideBar.items')),
            'frontSidebarItems' => $templateService::getSideBarItems(config('template.sideBarFront.items')),
            'message' =>  fn () => $request->session()->get('message')
        ];
    }

    public function rootView(Request $request): string
    {
        /*
        if ($request->is(['admin', 'admin/*'])) {
            return 'admin';
        }
        */

        return 'layouts.inertia';
    }
}
