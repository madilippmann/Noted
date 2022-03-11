import React, { useState, useEffect } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './TextEditor.css';

export default function TextEditor() {

    const [editorState, setEditorState] = useState();
    const [markdown, setMarkdown] = useState()



    useEffect(() => {
        console.log('Markdown: ', markdown);
        // setMarkdown(draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
        // console.log('Markdown: ', draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    }, [markdown])

    return (
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbarClassName="toolbar-class"
            onEditorStateChange={setEditorState}
            onChange={(e) => {
                console.log('CHANGE: ', e);
                setMarkdown(draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
            }}
        />

    );

}
