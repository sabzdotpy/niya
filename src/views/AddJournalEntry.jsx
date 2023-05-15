import React, { useState, useEffect, useRef } from "react";
import "../styles/AddJournalEntry.scss";
import { EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
// import "draft-js/dist/Draft.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import {
	BsEmojiSmileFill,
	BsEmojiFrownFill,
	BsEmojiAngryFill,
	BsEmojiExpressionlessFill,
	BsEmojiHeartEyesFill,
	BsEmojiLaughingFill,
	BsEmojiWinkFill,
	BsEmojiSunglassesFill,
} from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAuth } from "../contexts/AuthContext";
import { green, pink, red } from "../scripts/Misc";

import {
	RiNumber1,
	RiNumber2,
	RiNumber3,
	RiNumber4,
	RiNumber5,
	RiNumber6,
	RiNumber7,
	RiNumber8,
	RiNumber9,
	// RiNumber10,
} from "react-icons/ri";
import useArray from "../hooks/useArray";

export default function AddJournalEntry() {
	const [setShowLogin, pushToNotifications] = useOutletContext();
	const navigate = useNavigate();

	const [mode, setMode] = useState("view");
	const [currentlyEditing, setCurrentlyEditing] = useState(false);

	const [moodsOpen, setMoodsOpen] = useState(false);

	const [title, setTitle] = useState("");
	const [editorState, setEditorState] = useState(null);
	const [timestamp, setTimestamp] = useState(null);
	const [selectedMood, setSelectedMood] = useState(4);
	const [error, setError] = useState(null);

	const titleInput = useRef();

	const moodOptions = useArray([
		{ number: 1, icon: <BsEmojiSmileFill size={"25px"} /> },
		{ number: 2, icon: <BsEmojiFrownFill size={"25px"} /> },
		{ number: 3, icon: <BsEmojiAngryFill size={"25px"} /> },
		{ number: 4, icon: <BsEmojiExpressionlessFill size={"25px"} /> },
		{ number: 5, icon: <BsEmojiHeartEyesFill size={"25px"} /> },
		{ number: 6, icon: <BsEmojiLaughingFill size={"25px"} /> },
		{ number: 7, icon: <BsEmojiWinkFill size={"25px"} /> },
		{ number: 8, icon: <BsEmojiSunglassesFill size={"25px"} /> },
		// { number: 9, icon: <RiNumber9 size={"25px"} /> },
		// { number: 10, icon: <RiNumber10 /> },
	]);

	const {
		currentUser,
		JOURNAL_ENTRIES,
		deleteJournalEntryFromDatabase,
		addJournalEntryToDatabase,
		readAndSetJournalEntries,
	} = useAuth();

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
		if (currentUser === "none") {
			setError("You don't seem to be logged in. Please log in to use journal.");
			return;
		}

		if (!currentUser && currentUser !== "none") {
			setError("Loading.");
			return;
		}

		readAndSetJournalEntries().then(() => {
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
					setSelectedMood(Object.values(JOURNAL_ENTRIES?.value[index])[0].mood || 4);

					console.log(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0].text));

					if (
						JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0] && // 👈 null and undefined check
						Object.keys(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0]).length ===
							0 &&
						Object.getPrototypeOf(JSON.parse(Object.values(JOURNAL_ENTRIES?.value[index])[0]?.text)[0]) ===
							Object.prototype
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
		});

		// if (entryID) {
		// 	if (JOURNAL_ENTRIES?.value.includes(parseInt(entryID))) {
		// 		green("exists")
		// 	}
		// 	else {
		// 		red("nope")
		// 	}
		// }
	}, [currentUser]);

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
			mood: selectedMood,
		});

		addJournalEntryToDatabase(titleInput.current.value, jsonText, timestamp, selectedMood)
			.then((timestamp) => {
				setTimestamp(timestamp);
				// console.log(res);
				pushToNotifications("", "Journal entry saved.", "success");
				readAndSetJournalEntries()
					.then(() => {
						navigate(`/app-jou/${timestamp}`);
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
						<div
							className={"mood " + (mode === "edit" ? "edit" : "")}
							onClick={() => {
								if (mode === "edit") {
									setMoodsOpen((moodsOpen) => !moodsOpen);
								}
							}}
							onBlur={() => setMoodsOpen(false)}
						>
							{React.cloneElement(moodOptions.value.find((mood) => mood.number === selectedMood).icon, {
								size: "20px",
							})}
							{/* <BsEmojiSmileFill className="dropbtn" /> */}
							<div class={"dropdown-content" + (moodsOpen ? " show" : "")}>
								{/* <ul className="moods-dropdown"> */}
								{moodOptions.value.map((mood, index) => {
									return (
										<div key={index} className="item" onClick={() => setSelectedMood(mood.number)}>
											<span className="icon">{mood.icon}</span>
											{/* <span className="name">{mood.number}</span> */}
										</div>
									);
								})}
								{/* </ul> */}
							</div>
						</div>

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
