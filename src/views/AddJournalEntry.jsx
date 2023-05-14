import React, { useState, useEffect, useRef } from "react";
import "../styles/AddJournalEntry.scss";
import { EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
// import "draft-js/dist/Draft.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAuth } from "../contexts/AuthContext";
import { green, pink, red } from "../scripts/Misc";

export default function AddJournalEntry() {
	const { addJournalEntryToDatabase, readAndSetJournalEntries } = useAuth();
	const [setShowLogin, pushToNotifications] = useOutletContext();
	const navigate = useNavigate();

	const [mode, setMode] = useState("view");
	const [currentlyEditing, setCurrentlyEditing] = useState(false);

	const [title, setTitle] = useState("");
	const [editorState, setEditorState] = useState(null);
	const [timestamp, setTimestamp] = useState(null);

	const [error, setError] = useState(null);

	const titleInput = useRef();

	const { JOURNAL_ENTRIES, deleteJournalEntryFromDatabase } = useAuth();

	const toolbarOptions = {
		options: [
			"inline",
			"blockType",
			"fontSize",
			// "fontFamily",
			"list",
			// "textAlign",
			"colorPicker",
			"link",
			// "embedded",
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

			if (index === -1) {
				setError("The journal entry you are looking for was not found on the server.");
			} else {
				console.log("--------------");
				console.log(Object.values(JOURNAL_ENTRIES?.value[index]));
				console.log("--------------");

				setTimestamp(Object.values(JOURNAL_ENTRIES?.value[index])[0].timestamp);

				setTitle(Object.values(JOURNAL_ENTRIES?.value[index])[0].title);

				console.log(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0].text));
				if (
					JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0] && // 👈 null and undefined check
					Object.keys(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0]).length === 0 &&
					Object.getPrototypeOf(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0]) === Object.prototype
				) {
					setEditorState("");
				} else {
					setEditorState(
						EditorState.createWithContent(
							convertFromRaw(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0].text))
						)
					);
				}
			}
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
	};

	const saveEntry = () => {
		if (currentlyEditing) {
			console.log("I should update this entry.");
		} else {
			console.log("I am creating a new entry.");
		}
		let jsonText;

		if (editorState) {
			jsonText = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
			console.log(jsonText);
		} else {
			jsonText = JSON.stringify([{}]);
		}

		console.table({
			title: titleInput.current.value,
			text: jsonText,
		});

		addJournalEntryToDatabase(titleInput.current.value, jsonText, timestamp)
			.then((timestamp) => {
				setTimestamp(timestamp);
				// console.log(res);
				pushToNotifications("", "Journal entry saved.", "success");
				readAndSetJournalEntries()
				.then(() => {
					// console.log(`This is timestamp -> ${timestamp}`)
					navigate(`/app-jou/${timestamp}`);
					// ! CHANGES TO NULL FOR SOME REASON.
				})
				.catch((e) => {
					setError(e);
				});
				// setMode("view");
			})
			.catch((e) => {
				console.log(e);
				pushToNotifications("", e, "error");
			});

	};

	const deleteEntry = () => {
		if (!timestamp) {
			pushToNotifications("Critical error", "Could not delete. No entry found", "error");
			console.error("no timestamp found");
			return;
		}

		deleteJournalEntryFromDatabase(timestamp)
			.then((res) => {
				pushToNotifications("Success", res, "success");
				navigate("/app-jou");
			})
			.catch((e) => {
				pushToNotifications("Error", e.message, "error");
				console.warn(e);
			});
	};

	return (
		<div className={"addNew " + mode}>
			{error ? (
				<div className="errorMessage">{error}</div>
			) : (
				<>
					<div className="topBar">
						{mode === "edit" ? (
							<button className="edit" onClick={saveEntry} title="Save Entry">
								Save
							</button>
						) : (
							<button
								className="edit"
								title="Edit Entry"
								onClick={() => {
									setCurrentlyEditing(true);
									setMode("edit");
								}}
							>
								Edit
							</button>
						)}
						{mode === "view" || (mode === "edit" && currentlyEditing) ? (
							<button className="delete" title="Delete Entry" onClick={deleteEntry}>
								<BiTrash size={25} />
							</button>
						) : (
							<></>
						)}
					</div>
					<div className="titleContainer">
						<input
							ref={titleInput}
							type="text"
							className="titleInput"
							placeholder={mode === "view" ? "" : "Enter a title..."}
							value={title}
							onClick={() => {
								console.log(mode);
								console.log(currentlyEditing);
							}}
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

					{/* {mode === "edit" ? (
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
					)} */}
				</>
			)}

			{/* <Editor /> */}
		</div>
	);
}
