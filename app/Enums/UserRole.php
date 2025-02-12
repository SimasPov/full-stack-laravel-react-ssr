<?php

declare(strict_types=1);

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Commenter = 'commenter';
    case User = 'user';

    public static function toArray(): array
    {
        return [
            self::Admin->value => 'Admin',
            self::Commenter->value => 'Commenter',
            self::User->value => 'User',
        ];
    }

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::Commenter => 'Commenter',
            self::User => 'User'
        };
    }
}
