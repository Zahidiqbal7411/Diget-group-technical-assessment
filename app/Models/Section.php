<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'parent_id',
        'title',
        'content',
        'order',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'parent_id');
    }

    public function subsections(): HasMany
    {
        return $this->hasMany(Section::class, 'parent_id')->orderBy('order');
    }

    public function allSubsections(): HasMany
    {
        return $this->subsections()->with('allSubsections');
    }
}
