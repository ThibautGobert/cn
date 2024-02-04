<x-mail::message>
# Invitation à l'atelier {{$atelier->title}} du {{$atelier->from->format('d/m/Y')}}

Bonjour {{$user->full_name}},

L'organisateur de l'atelier {{$atelier->title}} vous propose d'y participer en tant que {{ Str::lower(\App\Enums\UserType::getDescription($user->type_id))}}. <br>

Vous pouvez répondre à l'invitation en cliquant sur le lien ci-dessous.

<x-mail::button :url="$url">
Répondre à l'invitation
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
