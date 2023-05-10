import React, { useState, useEffect, useRef } from "react";
import "../styles/AddJournalEntry.scss";
import { EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
// import "draft-js/dist/Draft.css";
import { useOutletContext } from "react-router-dom";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAuth } from "../contexts/AuthContext";
import { green, pink, red } from "../scripts/Misc";

export default function AddJournalEntry() {
	const { addJournalEntryToDatabase, readAndSetJournalEntries } = useAuth();
	const [setShowLogin, pushToNotifications] = useOutletContext();

	const [mode, setMode] = useState("edit");
	const [currentlyEditing, setCurrentlyEditing] = useState(false);

	const [title, setTitle] = useState("");
	const [editorState, setEditorState] = useState();
	const [timestamp, setTimestamp] = useState(null);

	const titleInput = useRef();

	const { JOURNAL_ENTRIES } = useAuth();

	const toolbarOptions = {
		options: [
			"inline",
			"blockType",
			"fontSize",
			"fontFamily",
			"list",
			// "textAlign",
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
			options: ["Arial"],
		},
	};

	useEffect(() => {
		console.log(Object.values(JOURNAL_ENTRIES.value));

		// for( let i in JOURNAL_ENTRIES.value) {
		// 	console.log(JOURNAL_ENTRIES[i])
		// }

		console.log(window.location.pathname.split("/"));
		let entryID = window.location.pathname.split("/");
		if (entryID.length === 3 && entryID[2] && entryID[2] !== "new") {
			entryID = entryID[2];
			setMode("view");
			green(`looking for ${entryID}`);
			const index = getEntryData(entryID);

			console.log("--------------");
			console.log(Object.values(JOURNAL_ENTRIES?.value[index]));

			setTimestamp(Object.values(JOURNAL_ENTRIES?.value[index])[0].timestamp);

			setTitle(Object.values(JOURNAL_ENTRIES?.value[index])[0].title);

			console.log(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0].text));
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0].text))
				)
			);

			console.log("--------------");
		} else if (entryID[2] === "new") {
			pink("Add new entry");
			setMode("edit");
		}

		// if (entryID) {
		// 	if (JOURNAL_ENTRIES?.value.includes(parseInt(entryID))) {
		// 		green("exists")
		// 	}
		// 	else {
		// 		red("nope")
		// 	}
		// }
	}, []);

	const getEntryData = (entryID) => {
		console.log(`Looking for ID when length is ${JOURNAL_ENTRIES.value.length}`);

		for (let index = 0; index < JOURNAL_ENTRIES?.value.length; index++) {
			let entry = JOURNAL_ENTRIES?.value[index];
			console.log(entry);

			if (Object.values(entry)[0].timestamp == entryID) {
				green(`Found at ${index}`);
				return index;
			} else {
				red(`Not found at ${index}`);
			}
		}

		return -1;

		// JOURNAL_ENTRIES?.value.forEach((entry, index) => {
		// 	if (Object.values(entry)[0].timestamp == entryID) {
		// 		green(`Found at ${index}`);
		// 		return index;
		// 	} else {
		// 		red(`Not found at ${index}`);
		// 		return -1;
		// 	}
		// });
	};

	const saveEntry = () => {
		if (currentlyEditing) {
			console.log("I should update this entry.");
		} else {
			console.log("I am creating a new entry.");
		}

		// return;
		const rawText = convertToRaw(editorState.getCurrentContent());

		console.log(rawText);
		console.table({
			title: titleInput.current.value,
			text: JSON.stringify(rawText),
		});

		addJournalEntryToDatabase(titleInput.current.value, JSON.stringify(rawText), timestamp)
			.then((res) => {
				console.log(res);
				pushToNotifications("", res, "success");
				readAndSetJournalEntries();
				setMode("view");
			})
			.catch((e) => {
				console.log(e);
				pushToNotifications("", e, "error");
			});

		// console.log(convertFromRaw(convertToRaw(editorState.getCurrentContent())))
	};

	const readEntry = () => {
		// setEditorState(convertFromRaw( JSON.parse(localStorage.getItem("text")) ))
		const parsedText = JSON.parse(localStorage.getItem("text"));

		// console.log(parsedText)
		// setEditorState(parsedText)
		setTitle(localStorage.getItem("title"));
		// setEditorState(EditorState.createWithContent(convertFromRaw(parsedText)));
	};

	return (
		<div className={"addNew " + mode}>
			{/* <Editor /> */}
			<div className="TITLECONTAINER">
				<input
					ref={titleInput}
					type="text"
					className="titleInput"
					placeholder={mode === "view" ? "" : "Enter a title..."}
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
					readOnly={mode === "view"}
				/>
			</div>
			<Editor
				editorState={editorState}
				toolbarClassName="editorToolbar"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={setEditorState}
				toolbar={toolbarOptions}
				placeholder={mode === "view" ? "" : "Type something..."}
				readOnly={mode === "view"}
			/>

			{mode === "edit" ? (
				<button className="saveEntry" onClick={saveEntry}>
					Save
				</button>
			) : (
				<button
					className="saveEntry"
					onClick={() => {
						setCurrentlyEditing(true);
						setMode("edit");
					}}
				>
					Edit
				</button>
			)}
		</div>
	);
}
