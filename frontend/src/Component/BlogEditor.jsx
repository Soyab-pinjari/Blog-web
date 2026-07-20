import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";


const BlogEditor = ({content,setContent})=>{
    const btn =
    "px-3 py-2 rounded-md border border-gray-300 hover:bg-blue-500 hover:text-white transition";
    
  
  const editor = useEditor({
      extensions: [StarterKit,TextStyle,
    Color,
],
      
      content: content,
      
      onUpdate: ({ editor }) => {
          const html = editor.getHTML();
          
          setContent(html);
        },
    })
    if (!editor) {
        return null;
    }
  
return(
    <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-100 border-b">

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <b>B</b>
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <i>I</i>
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
        >
          H
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          • List
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          1. List
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          ❝
        </button>

        <button
          type="button"
           className={btn}
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
        >
          {"</>"}
        </button>
        
{/* <button
  type="button"
  onClick={() => editor.chain().focus().setColor("#ef4444").run()}
>
  🔴
</button>

<button
  type="button"
  onClick={() => editor.chain().focus().setColor("#2563eb").run()}
>
  🔵
</button>

<button
  type="button"
  onClick={() => editor.chain().focus().setColor("#16a34a").run()}
>
  🟢
</button> */}


{/* <button
  type="button"
  onClick={() => editor.chain().focus().unsetColor().run()}
>
  Reset
</button> */}
<input
  type="color"
  onChange={(e) =>
    editor.chain().focus().setColor(e.target.value).run()
  }
  className="w-5 h-5 rounded-full cursor-pointer border-0 appearance-none"
/>
      </div>

      {/* EDITOR */}
   <div className="border rounded-lg">
  <EditorContent
    editor={editor}
    className="editor-content [&_.ProseMirror]:min-h-[250px] [&_.ProseMirror]:max-h-[500px] [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none"
  />
</div>
    </div>
  );
};

export default BlogEditor;
