<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalBooks' => Book::count(),
                'adminsCount' => User::where('is_admin', true)->count(),
            ],
            'users' => User::latest()->get(),
            'books' => Book::with('author')->latest()->get(),
        ]);
    }

    public function toggleAdmin(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'You cannot change your own admin status.']);
        }

        $user->update(['is_admin' => !$user->is_admin]);

        return back()->with('success', 'User admin status updated.');
    }

    public function toggleRole(User $user)
    {
        $newRole = $user->role === 'author' ? 'collaborator' : 'author';
        $user->update(['role' => $newRole]);

        return back()->with('success', "User role updated to {$newRole}.");
    }

    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'You cannot delete yourself.']);
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }

    public function deleteBook(Book $book)
    {
        $book->delete();

        return back()->with('success', 'Book deleted successfully.');
    }
}
