<?php

namespace App\Services;

use App\Models\Book;
use App\Models\User;

class BookService
{
    public function createBook(User $user, array $data): Book
    {
        return $user->books()->create([
            ...$data,
            'last_editor_id' => $user->id,
        ]);
    }

    public function addCollaborator(Book $book, User $user): void
    {
        if (!$book->isAuthor($user) && !$book->isCollaborator($user)) {
            $book->collaborators()->attach($user->id, ['role' => 'collaborator']);
        }
    }

    public function removeCollaborator(Book $book, User $user): void
    {
        $book->collaborators()->detach($user->id);
    }

    public function getAccessibleBooks(User $user)
    {
        return $user->allAccessibleBooks()->with('author')->latest()->get();
    }
}
