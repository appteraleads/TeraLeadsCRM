import React, { useState, useRef } from "react";

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);

  // Handle text content changes
  const handleChange = (e) => {
    setEditorContent(e.target.innerHTML);
  };

  // Apply styling commands like bold, italic, underline, etc.
  const toggleStyle = (style) => {
    document.execCommand(style, false, null);
  };

  // Font size change
  const handleFontSizeChange = (e) => {
    document.execCommand("fontSize", false, e.target.value);
  };

  // Text color change
  const handleTextColorChange = (e) => {
    document.execCommand("foreColor", false, e.target.value);
  };

  // Background color change
  const handleBgColorChange = (e) => {
    document.execCommand("backColor", false, e.target.value);
  };

  // Text alignment
  const toggleAlign = (align) => {
    document.execCommand("justify" + align, false, null);
  };

  // List functionalities (ordered and unordered)
  const toggleList = (listType) => {
    document.execCommand(listType, false, null);
  };

  // Insert link functionality
  const insertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  // Insert image functionality
  const insertImage = () => {
    const imageUrl = prompt("Enter the image URL");
    if (imageUrl) {
      document.execCommand("insertImage", false, imageUrl);
    }
  };

  // Undo and redo functionalities
  const undo = () => {
    document.execCommand("undo");
  };
  const redo = () => {
    document.execCommand("redo");
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => toggleStyle("bold")}>Bold</button>
        <button onClick={() => toggleStyle("italic")}>Italic</button>
        <button onClick={() => toggleStyle("underline")}>Underline</button>
        <select onChange={handleFontSizeChange}>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>
        <input type="color" onChange={handleTextColorChange} />
        <input type="color" onChange={handleBgColorChange} />
        <button onClick={() => toggleAlign("Left")}>Align Left</button>
        <button onClick={() => toggleAlign("Center")}>Align Center</button>
        <button onClick={() => toggleAlign("Right")}>Align Right</button>
        <button onClick={() => toggleList("insertOrderedList")}>Ordered List</button>
        <button onClick={() => toggleList("insertUnorderedList")}>Unordered List</button>
        <button onClick={insertLink}>Insert Link</button>
        <button onClick={insertImage}>Insert Image</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        style={{
          border: "1px solid #ccc",
          minHeight: "200px",
          padding: "10px",
          marginTop: "20px",
        }}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: editorContent }}
      ></div>
    </div>
  );
};

export default TextEditor;
