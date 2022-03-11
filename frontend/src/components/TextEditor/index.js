import React, { Component, useState, useEffect } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';

export default function EditorConvertToMarkdown() {

    const [editorState, setEditorState] = useState();
    const [markdown, setMarkdown] = useState()



    useEffect(() => {
        console.log('Markdown: ', markdown);
        // setMarkdown(draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
        // console.log('Markdown: ', draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    }, [markdown])

    return (
        <div>
            <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={setEditorState}
                onChange={(e) => {
                    console.log('CHANGE: ', e);
                    setMarkdown(draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    );

}
