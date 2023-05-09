import React, { useState, useRef } from "react";
import "../styles/AddJournalEntry.scss";
import { EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
// import "draft-js/dist/Draft.css";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddJournalEntry() {

	const [title, setTitle] = useState( localStorage.getItem("title") || "" );

	const titleInput = useRef();

	const sampleVal = {
		entityMap: {},
		blocks: [
			{
				key: "637gr",
				text: "This is some bold italic underlined and strikethrough text.",
				type: "unstyled",
				depth: 0,
				inlineStyleRanges: [
					{
						offset: 0,
						length: 59,
						style: "fontfamily-Arial",
					},
					{
						offset: 13,
						length: 4,
						style: "BOLD",
					},
					{
						offset: 18,
						length: 6,
						style: "ITALIC",
					},
					{
						offset: 25,
						length: 10,
						style: "UNDERLINE",
					},
					{
						offset: 40,
						length: 13,
						style: "STRIKETHROUGH",
					},
				],
				entityRanges: [],
				data: {},
			},
		],
	};

	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createWithContent(convertFromRaw(sampleVal))
	);

	const toolbarOptions = {
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
			"image",
			"remove",
			"history",
		],
		inline: {
			inDropdown: false,
			className: undefined,
			component: undefined,
			dropdownClassName: undefined,
			options: ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"],
		},
		blockType: {
			inDropdown: true,
			options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
		},
		fontFamily: {
			// options: ["Jost", "Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"],
			options: ["Arial"]
		},
	};

	const saveEntry = () => {
		const rawText = convertToRaw(editorState.getCurrentContent());

		console.log(rawText);
		localStorage.setItem("title", titleInput.current.value)
		localStorage.setItem("text", JSON.stringify(rawText));
		// console.log(convertFromRaw(convertToRaw(editorState.getCurrentContent())))
	};

	const readEntry = () => {
		// setEditorState(convertFromRaw( JSON.parse(localStorage.getItem("text")) ))
		const parsedText = JSON.parse(localStorage.getItem("text"));

		// console.log(parsedText)
		// setEditorState(parsedText)
		setTitle(localStorage.getItem("title"))
		setEditorState(EditorState.createWithContent(convertFromRaw(parsedText)));
	};

	return (
		<div className="addNew">
			{/* <Editor /> */}
			<div className="TITLECONTAINER">
				<input ref={titleInput} type="text" className="titleInput" placeholder="Enter a catchy title..." value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
			</div>
			<Editor
				editorState={editorState}
				toolbarClassName="editorToolbar"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={setEditorState}
				toolbar={toolbarOptions}
				placeholder={"Type something..."}
				// readOnly
			/>



			<button className="saveEntry" onClick={saveEntry}>
				Save to localStorage
			</button>
			<button className="" onClick={readEntry}>
				Read from localStorage
			</button>
		</div>
	);
}
