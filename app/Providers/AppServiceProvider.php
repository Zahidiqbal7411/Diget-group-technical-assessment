<?php

namespace App\Providers;

use App\Models\Book;
use App\Models\Section;
use App\Policies\BookPolicy;
use App\Policies\SectionPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::policy(Book::class, BookPolicy::class);
        Gate::policy(Section::class, SectionPolicy::class);
    }
}
