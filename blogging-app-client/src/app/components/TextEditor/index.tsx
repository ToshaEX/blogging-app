import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import styles from "./styles.module.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type EditorPropsType = {
  setFiledValue: any;
  filedName: any;
  reset: boolean;
  post?: string;
};

const TextEditor = ({
  setFiledValue,
  filedName,
  reset,
  post = "",
}: EditorPropsType) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(post).contentBlocks)
    )
  );

  const handleEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    setFiledValue(
      filedName,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const resetEditorState = () => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(post).contentBlocks)
      )
    );
  };

  useEffect(() => {
    resetEditorState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);
  return (
    <Editor
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "embedded",
          "emoji",
          "remove",
          "history",
        ],
      }}
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName={styles.editor}
      onEditorStateChange={handleEditorStateChange}
    />
  );
};

export default TextEditor;
