import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SectionTree({ sections, bookId, canManage, onSelectSection, selectedSectionId }) {
    return (
        <div className="space-y-1">
            {sections.map((section) => (
                <SectionItem
                    key={section.id}
                    section={section}
                    bookId={bookId}
                    canManage={canManage}
                    onSelectSection={onSelectSection}
                    selectedSectionId={selectedSectionId}
                    depth={0}
                />
            ))}
        </div>
    );
}

function SectionItem({ section, bookId, canManage, onSelectSection, selectedSectionId, depth }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isAddingChild, setIsAddingChild] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const hasChildren = section.all_subsections && section.all_subsections.length > 0;
    const isSelected = selectedSectionId === section.id;
    const paddingLeft = depth * 16;

    const handleAddChild = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        router.post(
            route('sections.store', bookId),
            { title: newTitle, parent_id: section.id },
            {
                onSuccess: () => {
                    setNewTitle('');
                    setIsAddingChild(false);
                },
            }
        );
    };

    const handleDelete = () => {
        if (confirm('Delete this section and all its subsections?')) {
            router.delete(route('sections.destroy', section.id));
        }
    };

    return (
        <div style={{ paddingLeft: `${paddingLeft}px` }}>
            <div
                className={`group flex items-center rounded px-2 py-1 text-sm ${isSelected
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400"
                >
                    {hasChildren ? (isExpanded ? '▼' : '▶') : '•'}
                </button>
                <button
                    type="button"
                    onClick={() => onSelectSection(section)}
                    className="flex-1 truncate text-left"
                >
                    {section.title}
                </button>
                {canManage && (
                    <div className="hidden group-hover:flex">
                        <button
                            type="button"
                            onClick={() => setIsAddingChild(true)}
                            className="ml-1 text-xs text-indigo-600 hover:text-indigo-800"
                            title="Add subsection"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="ml-1 text-xs text-red-600 hover:text-red-800"
                            title="Delete section"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>

            {isAddingChild && (
                <form onSubmit={handleAddChild} className="ml-5 mt-1 flex">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Subsection title"
                        className="flex-1 rounded-l border border-gray-300 px-2 py-1 text-sm"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="rounded-r bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-700"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAddingChild(false)}
                        className="ml-1 text-sm text-gray-500"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {isExpanded && hasChildren && (
                <div className="mt-1">
                    {section.all_subsections.map((child) => (
                        <SectionItem
                            key={child.id}
                            section={child}
                            bookId={bookId}
                            canManage={canManage}
                            onSelectSection={onSelectSection}
                            selectedSectionId={selectedSectionId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
