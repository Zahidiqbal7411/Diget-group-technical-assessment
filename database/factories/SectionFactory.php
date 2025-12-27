<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'title' => $this->faker->sentence(2),
            'content' => $this->faker->paragraphs(3, true),
            'order' => 0,
            'parent_id' => null,
        ];
    }
}
