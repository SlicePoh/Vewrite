import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

//const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  //indentation
  [{ indent: "+1" }, { indent: "-1" }],
  //sub and super script
  [{ script: "sub" }, { script: "super" }],
  //alignment
  [{ align: [] }],
  //font size
  [{ size: ["small", "large", "huge", false] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];
// const TOOLBAR_OPTIONS_1 = [
//     //font size
//     [{ size: ["small", "large", "huge", false] }],
//     [{ font: [] }],
//     ["bold", "italic", "underline"],
//     [{ color: [] }, { background: [] }],
//     //alignment
//     [{ align: [] }],
// ];

const TextEditor = (props) => {
  const { content, handleContent } = props;
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    let unmounted = false;

    if (quill) {
      const handleChange = (delta, oldDelta, source) => {
        if (!unmounted && source === "user") {
          const updatedContent = quill.getText();
          handleContent(updatedContent);
        }
      };

      quill.on("text-change", handleChange);
      return () => {
        quill.off("text-change", handleChange);
      };
    }

    return () => {
      unmounted = true;
    };
  }, [quill, handleContent]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper && !quill) {
        const editor = document.createElement("div");
        wrapper.append(editor);

        const q = new Quill(
          editor,
          {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS }, //Toolbar on the top
          }
          //     editor, {
          //     theme: "bubble",
          //     modules: { toolbar: TOOLBAR_OPTIONS_1 }, //Tooltip for mini editing
          // }
        );
        setQuill(q);

        if (content) {
          q.clipboard.dangerouslyPasteHTML(content);
          //   q.setContents(content);
          q.setSelection(q.getLength(), 0);
        }
      }
    },
    [quill, content]
  );

  return (
    <>
      <div
        className="texteditor w-full rounded-md p-2 dark:text-white"
        ref={wrapperRef}
      ></div>
    </>
  );
};

export default TextEditor;
