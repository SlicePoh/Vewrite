import React, { useEffect, useRef, useState } from "react";
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
  [{ indent: "+1" }, { indent: "-1" }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  [{ size: ["small", "large", "huge", false] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];


const TextEditor = (props) => {
  const { content, handleContent } = props;
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    let unmounted = false;

    if (quill) {
      const handleChange = (delta, oldDelta, source) => {
        if (!unmounted && source === "user") {
          const updatedContent = quill.getContents().ops;
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
          },
          //     editor, {
          //     theme: "bubble",
          //     modules: { toolbar: TOOLBAR_OPTIONS_1 }, //Tooltip for mini editing
          // }
        );
        setQuill(q);

        if (content) {
          // q.clipboard.dangerouslyPasteHTML(content);
            q.setContents(content);
          q.setSelection(q.getLength(), 0);
        }
      }
    },
    [quill, content]
  );
  // const [darkMode] = useState(
  //   JSON.parse(localStorage.getItem("darkMode") || false)
  // );
  // const toolbarRef = useRef(null);

  // useEffect(() => {
  //   if (toolbarRef.current) {
  //     // Select all SVG elements inside the toolbar using ref
  //     const toolbarSvgs = toolbarRef.current.querySelectorAll('svg');

  //     // Apply styles based on dark mode
  //     toolbarSvgs.forEach((svg) => {
  //        svg.style.fill = darkMode ? '#ffffff' : '#4a4a4a';
  //       svg.style.stroke = darkMode ? '#ffffff' : '#4a4a4a';
  //       svg.style.background = darkMode ? '#ffffff' : '#4a4a4a'; 
  //       svg.style = darkMode ? '#ffffff' : '#4a4a4a'; 
  //     });
  //   }
  // }, [darkMode]);

  return (
    <>
      <div className="texteditor w-full rounded-md dark:text-white " ref={wrapperRef} >

      </div>
    </>
  );
};

export default TextEditor;
