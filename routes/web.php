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
    $ownedBooks = $user->books()->with('author')->latest()->take(5)->get();
    $sharedBooks = $user->collaboratedBooks()->with('author')->latest()->take(5)->get();

    return Inertia::render('Dashboard', [
        'ownedBooksCount' => $user->books()->count(),
        'sharedBooksCount' => $user->collaboratedBooks()->count(),
        'recentOwnedBooks' => $ownedBooks,
        'recentSharedBooks' => $sharedBooks,
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
});

require __DIR__ . '/auth.php';

