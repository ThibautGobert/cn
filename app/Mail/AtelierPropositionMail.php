<?php

namespace App\Mail;

use App\Models\Atelier;
use App\Models\AtelierProposition;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AtelierPropositionMail extends Mailable
{
    use Queueable, SerializesModels;
    public string $url;

    /**
     * Create a new message instance.
     */
    public function __construct(public Atelier $atelier, public User $user, public AtelierProposition $proposition)
    {
        $this->url =  env('APP_URL').'/atelier/'.$this->atelier->id.'/confirmation/'.$this->proposition->id.'/'.$this->user->id;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: env('MAIL_FROM_ADDRESS', 'app@croquez-nous.com'),
            to: $this->user->email,
            subject: 'Invitation à l\'atelier ' . $this->atelier->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.proposition.from-atelier',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
