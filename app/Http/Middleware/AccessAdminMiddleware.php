<?php

namespace App\Http\Middleware;

use App\Enums\Permissions\AdministrationPermissionType;
use Closure;
use Illuminate\Http\Request;

class AccessAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  (Request) $request : (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        if(!auth()->user() || !auth()->user()->can(AdministrationPermissionType::MANAGE->value)) {
            return redirect()->route('home')
                ->withMessage(['type' => 'error', 'content' => 'Vous n\'avez pas accès à cette resource']);
        }
        return $next($request);
    }
}
