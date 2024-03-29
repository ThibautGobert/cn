<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
        $this->renderable(function (UnloggedException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Non autorisé.'], 403);
            }

            // Rediriger vers la route de login si l'exception est une AuthorizationException
            return redirect()->route('login')->withMessage(['type' => 'error', 'content' => 'Vous devez être connecté pour accéder à cette page']);
        });
    }
}
