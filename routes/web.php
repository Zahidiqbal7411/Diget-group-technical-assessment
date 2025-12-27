<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CollaboratorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $isAuthor = $user->role === 'author';

    $ownedBooks = $isAuthor
        ? $user->books()->with(['author', 'collaborators'])->latest()->take(5)->get()
        : collect();

    $sharedBooks = $user->collaboratedBooks()->with('author')->latest()->take(5)->get();

    $collaboratorActivity = collect();
    if ($isAuthor) {
        $bookIds = $user->books()->pluck('id');

        $sectionUpdates = \App\Models\Section::whereIn('book_id', $bookIds)
            ->whereNotNull('last_editor_id')
            ->where('last_editor_id', '!=', $user->id)
            ->with(['lastEditor', 'book'])
            ->latest('updated_at')
            ->take(5)
            ->get()
            ->map(function ($section) {
                return [
                    'type' => 'section',
                    'id' => $section->id,
                    'book_id' => $section->book_id,
                    'title' => $section->title,
                    'book_title' => $section->book->title,
                    'editor_name' => $section->lastEditor->name,
                    'updated_at' => $section->updated_at->diffForHumans(),
                ];
            });

        $bookUpdates = \App\Models\Book::whereIn('id', $bookIds)
            ->whereNotNull('last_editor_id')
            ->where('last_editor_id', '!=', $user->id)
            ->with('lastEditor')
            ->latest('updated_at')
            ->take(5)
            ->get()
            ->map(function ($book) {
                return [
                    'type' => 'book',
                    'id' => $book->id,
                    'book_id' => $book->id,
                    'title' => $book->title,
                    'book_title' => $book->title,
                    'editor_name' => $book->lastEditor->name,
                    'updated_at' => $book->updated_at->diffForHumans(),
                ];
            });

        $collaboratorActivity = $sectionUpdates->concat($bookUpdates)
            ->sortByDesc('updated_at')
            ->take(5)
            ->values();
    }

    return Inertia::render('Dashboard', [
        'ownedBooksCount' => $isAuthor ? $user->books()->count() : 0,
        'sharedBooksCount' => $user->collaboratedBooks()->count(),
        'recentOwnedBooks' => $ownedBooks,
        'recentSharedBooks' => $sharedBooks,
        'collaboratorActivity' => $collaboratorActivity,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('books', BookController::class)->except(['show']);
    Route::post('/books/{book}/sections', [SectionController::class, 'store'])->name('sections.store');
    Route::put('/sections/{section}', [SectionController::class, 'update'])->name('sections.update');
    Route::delete('/sections/{section}', [SectionController::class, 'destroy'])->name('sections.destroy');
    Route::post('/books/{book}/sections/reorder', [SectionController::class, 'reorder'])->name('sections.reorder');

    Route::post('/books/{book}/collaborators', [CollaboratorController::class, 'store'])->name('collaborators.store');
    Route::delete('/books/{book}/collaborators/{user}', [CollaboratorController::class, 'destroy'])->name('collaborators.destroy');

    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\AdminController::class, 'index'])->name('dashboard');
        Route::post('/users/{user}/toggle-admin', [\App\Http\Controllers\AdminController::class, 'toggleAdmin'])->name('users.toggle');
        Route::post('/users/{user}/toggle-role', [\App\Http\Controllers\AdminController::class, 'toggleRole'])->name('users.toggle-role');
        Route::delete('/users/{user}', [\App\Http\Controllers\AdminController::class, 'deleteUser'])->name('users.delete');
        Route::delete('/books/{book}', [\App\Http\Controllers\AdminController::class, 'deleteBook'])->name('books.delete');
    });
});

require __DIR__.'/auth.php';
