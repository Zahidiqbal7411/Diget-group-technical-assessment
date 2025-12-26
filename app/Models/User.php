<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'role' => 'string',
        ];
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function collaboratedBooks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_collaborators')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function allAccessibleBooks()
    {
        return Book::where('user_id', $this->id)
            ->orWhereHas('collaborators', fn($query) => $query->where('user_id', $this->id));
    }
}

