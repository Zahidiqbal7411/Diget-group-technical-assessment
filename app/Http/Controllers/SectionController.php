<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Section;
use App\Services\SectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class SectionController extends Controller
{
    public function __construct(protected SectionService $sectionService) {}

    public function store(Request $request, Book $book)
    {
        Gate::authorize('create', [Section::class, $book]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:sections,id',
            'content' => 'nullable|string',
        ]);

        $maxOrder = $book->sections()
            ->where('parent_id', $validated['parent_id'] ?? null)
            ->max('order') ?? 0;

        $book->sections()->create([
            ...$validated,
            'order' => $maxOrder + 1,
            'last_editor_id' => Auth::id(),
        ]);

        $this->sectionService->clearCache($book);

        return back()->with('success', 'Section created successfully.');
    }

    public function update(Request $request, Section $section)
    {
        $this->authorize('update', $section);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $validated['last_editor_id'] = Auth::id();

        $section->update($validated);

        $this->sectionService->clearCache($section->book);

        return back()->with('success', 'Section updated successfully.');
    }

    public function destroy(Section $section)
    {
        $this->authorize('delete', $section);

        $book = $section->book;
        $section->delete();

        $this->sectionService->clearCache($book);

        return back()->with('success', 'Section deleted successfully.');
    }

    public function reorder(Request $request, Book $book)
    {
        Gate::authorize('create', [Section::class, $book]);

        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|exists:sections,id',
            'sections.*.order' => 'required|integer|min:0',
            'sections.*.parent_id' => 'nullable|exists:sections,id',
        ]);

        foreach ($validated['sections'] as $sectionData) {
            Section::where('id', $sectionData['id'])->update([
                'order' => $sectionData['order'],
                'parent_id' => $sectionData['parent_id'],
            ]);
        }

        $this->sectionService->clearCache($book);

        return back()->with('success', 'Sections reordered successfully.');
    }
}
