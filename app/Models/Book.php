<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

    public function rootSections(): HasMany
    {
        return $this->hasMany(Section::class)->whereNull('parent_id')->orderBy('order');
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'book_collaborators')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function isAuthor(User $user): bool
    {
        return $this->user_id === $user->id;
    }

    public function isCollaborator(User $user): bool
    {
        return $this->collaborators()->where('user_id', $user->id)->exists();
    }

    public function hasAccess(User $user): bool
    {
        return $this->isAuthor($user) || $this->isCollaborator($user);
    }
}
