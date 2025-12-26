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
                    onSelect={onSelectSection}
                    selectedId={selectedSectionId}
                    level={0}
                />
            ))}
        </div>
    );
}

function SectionItem({ section, bookId, canManage, onSelect, selectedId, level }) {
    const [expanded, setExpanded] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const hasChildren = section.all_subsections?.length > 0;
    const isSelected = selectedId === section.id;

    const handleAddSubsection = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        router.post(route('sections.store', bookId), { title: newTitle, parent_id: section.id }, {
            onSuccess: () => {
                setNewTitle('');
                setShowInput(false);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Delete this section and all subsections?')) {
            router.delete(route('sections.destroy', section.id));
        }
    };

    return (
        <div style={{ marginLeft: `${level * 12}px` }}>
            <div
                className={`group flex items-center rounded px-2 py-1 text-sm ${isSelected ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                    }`}
            >
                {hasChildren ? (
                    <button onClick={() => setExpanded(!expanded)} className="mr-1 text-gray-400">
                        {expanded ? '▼' : '▶'}
                    </button>
                ) : (
                    <span className="mr-1 w-3"></span>
                )}
                <button onClick={() => onSelect(section)} className="flex-1 text-left truncate">
                    {section.title}
                </button>
                {canManage && (
                    <div className="hidden space-x-1 group-hover:flex">
                        <button onClick={() => setShowInput(!showInput)} className="text-indigo-500 text-xs">+</button>
                        <button onClick={handleDelete} className="text-red-500 text-xs">×</button>
                    </div>
                )}
            </div>

            {showInput && canManage && (
                <form onSubmit={handleAddSubsection} className="ml-4 mt-1">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Subsection name"
                        className="w-full rounded border px-2 py-1 text-xs"
                        autoFocus
                    />
                </form>
            )}

            {expanded && hasChildren && (
                <div>
                    {section.all_subsections.map((child) => (
                        <SectionItem
                            key={child.id}
                            section={child}
                            bookId={bookId}
                            canManage={canManage}
                            onSelect={onSelect}
                            selectedId={selectedId}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
