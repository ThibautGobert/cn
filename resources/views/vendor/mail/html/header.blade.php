@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img class="logo" src="{{env('APP_URL') . '/images/logo-350.png'}}" alt="Logo CroquezNous" />
{{--
@if (trim($slot) === 'Laravel')
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
@else
{{ $slot }}
@endif
--}}
</a>
</td>
</tr>
