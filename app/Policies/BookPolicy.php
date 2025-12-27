<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;

class BookPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Book $book): bool
    {
        return $book->hasAccess($user);
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Book $book): bool
    {
        return $book->isAuthor($user);
    }

    public function delete(User $user, Book $book): bool
    {
        return $book->isAuthor($user);
    }

    public function share(User $user, Book $book): bool
    {
        return $book->isAuthor($user);
    }

    public function manageCollaborators(User $user, Book $book): bool
    {
        return $book->isAuthor($user);
    }
}
