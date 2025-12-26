<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\Section;
use App\Models\User;

class SectionPolicy
{
    public function view(User $user, Section $section): bool
    {
        return $section->book->hasAccess($user);
    }

    public function create(User $user, Book $book): bool
    {
        return $book->isAuthor($user);
    }

    public function update(User $user, Section $section): bool
    {
        return $section->book->hasAccess($user);
    }

    public function delete(User $user, Section $section): bool
    {
        return $section->book->isAuthor($user);
    }
}
