<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['comment', 'user_id', 'feature_id'];

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function feature(): BelongsTo
    {
        return $this->BelongsTo(Feature::class);
    }
}
