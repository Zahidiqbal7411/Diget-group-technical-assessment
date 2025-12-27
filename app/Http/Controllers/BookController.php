<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Services\BookService;
use App\Services\SectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function __construct(
        protected BookService $bookService,
        protected SectionService $sectionService
    ) {}

    public function index(): Response
    {
        $user = Auth::user();
        $isAuthor = $user->role === 'author';
        $books = $this->bookService->getAccessibleBooks($user);
        $books->load('collaborators', 'author');

        $booksWithOwnership = $books->map(function ($book) use ($user) {
            $book->is_owner = $book->user_id === $user->id;
            $book->collaborators_count = $book->collaborators->count();

            return $book;
        });

        if (! $isAuthor) {
            $booksWithOwnership = $booksWithOwnership->filter(fn ($b) => ! $b->is_owner)->values();
        }

        return Inertia::render('Books/Index', [
            'books' => $booksWithOwnership,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Book::class);

        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Book::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $book = $this->bookService->createBook(Auth::user(), $validated);

        return redirect()->route('books.edit', $book)->with('success', 'Book created successfully.');
    }

    public function edit(Book $book): Response
    {
        $this->authorize('view', $book);

        $sections = $this->sectionService->getSectionTree($book);

        return Inertia::render('Books/Editor', [
            'book' => $book->load('author', 'collaborators'),
            'sections' => $sections,
            'canEdit' => $book->hasAccess(Auth::user()),
            'canManage' => $book->isAuthor(Auth::user()),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $this->authorize('update', $book);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['last_editor_id'] = Auth::id();

        $book->update($validated);

        return back()->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $this->authorize('delete', $book);

        $book->delete();

        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}
