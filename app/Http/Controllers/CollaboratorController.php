<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Services\BookService;
use Illuminate\Http\Request;

class CollaboratorController extends Controller
{
    public function __construct(protected BookService $bookService) {}

    public function store(Request $request, Book $book)
    {
        $this->authorize('manageCollaborators', $book);

        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'This user is not registered. They must create an account first.',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($book->isAuthor($user)) {
            return back()->withErrors(['email' => 'Cannot add the author as a collaborator.']);
        }

        $this->bookService->addCollaborator($book, $user);

        return back()->with('success', 'Collaborator added successfully.');
    }

    public function destroy(Book $book, User $user)
    {
        $this->authorize('manageCollaborators', $book);

        $this->bookService->removeCollaborator($book, $user);

        return back()->with('success', 'Collaborator removed successfully.');
    }
}
