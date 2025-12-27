<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Section;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_author_can_create_book()
    {
        $author = User::factory()->create(['role' => 'author']);

        $response = $this->actingAs($author)->post(route('books.store'), [
            'title' => 'Author Book',
            'description' => 'A book by author',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('books', ['title' => 'Author Book']);
    }

    public function test_collaborator_cannot_create_book()
    {
        $collaborator = User::factory()->create(['role' => 'collaborator']);

        $response = $this->actingAs($collaborator)->post(route('books.store'), [
            'title' => 'Collaborator Book',
            'description' => 'A book by collaborator',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('books', ['title' => 'Collaborator Book']);
    }

    public function test_author_can_create_section()
    {
        $author = User::factory()->create(['role' => 'author']);
        $book = Book::factory()->create(['user_id' => $author->id]);

        $response = $this->actingAs($author)->post(route('sections.store', $book), [
            'title' => 'Author Section',
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('sections', ['title' => 'Author Section']);
    }

    public function test_collaborator_cannot_create_section()
    {
        $author = User::factory()->create(['role' => 'author']);
        $collaborator = User::factory()->create(['role' => 'collaborator']);
        $book = Book::factory()->create(['user_id' => $author->id]);
        $book->collaborators()->attach($collaborator->id, ['role' => 'collaborator']);

        $response = $this->actingAs($collaborator)->post(route('sections.store', $book), [
            'title' => 'Collaborator Section',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('sections', ['title' => 'Collaborator Section']);
    }

    public function test_collaborator_can_edit_section()
    {
        $author = User::factory()->create(['role' => 'author']);
        $collaborator = User::factory()->create(['role' => 'collaborator']);
        $book = Book::factory()->create(['user_id' => $author->id]);
        $book->collaborators()->attach($collaborator->id, ['role' => 'collaborator']);
        $section = Section::factory()->create(['book_id' => $book->id]);

        $response = $this->actingAs($collaborator)->put(route('sections.update', $section), [
            'title' => 'Updated Section',
            'content' => 'Updated content',
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('sections', [
            'id' => $section->id,
            'title' => 'Updated Section',
            'content' => 'Updated content',
        ]);
    }

    public function test_collaborator_cannot_delete_section()
    {
        $author = User::factory()->create(['role' => 'author']);
        $collaborator = User::factory()->create(['role' => 'collaborator']);
        $book = Book::factory()->create(['user_id' => $author->id]);
        $book->collaborators()->attach($collaborator->id, ['role' => 'collaborator']);
        $section = Section::factory()->create(['book_id' => $book->id]);

        $response = $this->actingAs($collaborator)->delete(route('sections.destroy', $section));

        $response->assertStatus(403);
        $this->assertDatabaseHas('sections', ['id' => $section->id]);
    }

    public function test_collaborator_can_edit_book()
    {
        $author = User::factory()->create(['role' => 'author']);
        $collaborator = User::factory()->create(['role' => 'collaborator']);
        $book = Book::factory()->create(['user_id' => $author->id]);
        $book->collaborators()->attach($collaborator->id, ['role' => 'collaborator']);

        $response = $this->actingAs($collaborator)->put(route('books.update', $book), [
            'title' => 'Collaborator Updated Title',
            'description' => 'Updated description',
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'title' => 'Collaborator Updated Title',
        ]);
    }

    public function test_author_can_create_deeply_nested_sections()
    {
        $author = User::factory()->create(['role' => 'author']);
        $book = Book::factory()->create(['user_id' => $author->id]);

        // Level 1
        $l1 = Section::factory()->create(['book_id' => $book->id]);

        // Level 2
        $response = $this->actingAs($author)->post(route('sections.store', $book), [
            'title' => 'Level 2',
            'parent_id' => $l1->id,
        ]);
        $response->assertStatus(302);
        $l2 = Section::where('parent_id', $l1->id)->first();

        // Level 3
        $response = $this->actingAs($author)->post(route('sections.store', $book), [
            'title' => 'Level 3',
            'parent_id' => $l2->id,
        ]);
        $response->assertStatus(302);

        $this->assertDatabaseHas('sections', ['title' => 'Level 3', 'parent_id' => $l2->id]);
    }
}
