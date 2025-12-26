<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Facades\Cache;

class SectionService
{
    public function getSectionTree(Book $book): array
    {
        $cacheKey = "book_{$book->id}_sections";

        return Cache::remember($cacheKey, 3600, function () use ($book) {
            return $book->rootSections()->with('allSubsections')->get()->toArray();
        });
    }

    public function clearCache(Book $book): void
    {
        Cache::forget("book_{$book->id}_sections");
    }
}
