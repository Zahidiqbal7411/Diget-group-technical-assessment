import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RichTextEditor({ content, onUpdate }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({ onClick, active, children }) => (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-md p-2 transition-colors ${active
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border rounded-lg bg-white">
            <div className="flex flex-wrap gap-1 border-b p-1 bg-gray-50 rounded-t-lg">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                >
                    <span className="font-bold">B</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                >
                    <span className="italic">I</span>
                </ToolbarButton>
                <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                >
                    H3
                </ToolbarButton>
                <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                >
                    • List
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                >
                    1. List
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                >
                    " Quote
                </ToolbarButton>
            </div>
            <div className="p-4 min-h-[400px]">
                <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
            </div>
        </div>
    );
}
