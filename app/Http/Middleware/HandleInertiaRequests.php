<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
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
        $sideBarFront = [
            [
                'nodeText' => 'Accueil',
                'url' =>  '/',
            ],
            [
                'nodeText' => 'Administration',
                'url' =>  '/admin/dashboard',
                'requireAuth' => true,
                'permissions' => \App\Enums\Permissions\AdministrationPermissionType::MANAGE->value
            ],
            [
                'nodeText' => 'Profil',
                'url' =>  '/profile/'.auth()->user()?->id.'/show',
                'requireAuth' => true,
            ],
            [
                'nodeText' => 'Mes ateliers',
                'url' =>  '/atelier',
                'requireUserType' => [UserType::ATELIER->value, UserType::CROQUEUR->value, UserType::AUCUN->value],
            ],
            [
                'nodeText' => 'Connexion',
                'url' =>  '/login',
                'requireGuest' => true,
            ],
            [
                'nodeText' => 'Inscription',
                'url' =>  '/inscription',
                'requireGuest' => true,
            ],
            [
                'nodeText' => 'Abonnements',
                'url' =>  '/abonnement',
                'requireAuth' => true,
            ],
        ];

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
            'sidebarItems' => $templateService::getItems(config('template.sideBar.items')),
            'frontSidebarItems' => $templateService::getItems($sideBarFront),
            'message' =>  fn () => $request->session()->get('message'),
            'loggedAs' => session()->get('logged_as'),
            'mainUser' => session()->get('main_user')

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
