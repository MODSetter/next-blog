"use client";

import { EditorContent, EditorRoot } from "novel";
import { useState } from "react";

const TailwindEditor = () => {
  const [content, setContent] = useState(null);
  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
};
export default TailwindEditor;
