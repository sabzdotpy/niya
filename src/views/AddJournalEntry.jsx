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
	const [geminiEnabledOrNot, setGeminiEnabledOrNot] = useState(false);
	const [selectedMood, setSelectedMood] = useState(4);
	const [error, setError] = useState(null);

	const [geminiResponding, setGeminiResponding] = useState(false);
	const [geminiResponse, setGeminiResponse] = useState("");

	const titleInput = useRef();
	const geminiToggle = useRef();
	const geminiResponseDiv = useRef();
	const saveButton = useRef();

	const moodOptions = useArray([
		{ number: 1, icon: <BsEmojiSmileFill size={"30px"} color={"#f3f36b"} title={"Good"} /> },
		{ number: 2, icon: <BsEmojiFrownFill size={"30px"} color={"#ff8658"} title={"Sad"} /> },
		{ number: 3, icon: <BsEmojiAngryFill size={"30px"} title={"Angry"} /> },
		{ number: 4, icon: <BsEmojiExpressionlessFill size={"30px"} title={"Meh"} /> },
		{ number: 5, icon: <BsEmojiHeartEyesFill size={"30px"} title={"Love"} /> },
		{ number: 6, icon: <BsEmojiLaughingFill size={"30px"} title={"Haha"} /> },
		{ number: 7, icon: <BsEmojiWinkFill size={"30px"} title={"Wink"} /> },
		{ number: 8, icon: <BsEmojiSunglassesFill size={"30px"} title={"Cool"} /> },
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

	const geminiEnableToggle = () => {
		console.log("Toggling.")
		if (geminiToggle.current) setGeminiEnabledOrNot(geminiToggle.current.checked)
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
					setGeminiEnabledOrNot(Object.values(JOURNAL_ENTRIES?.value[index])[0].geminiEnabled);
					setGeminiResponse(Object.values(JOURNAL_ENTRIES?.value[index])[0].geminiResponse);
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
		saveButton.current.textContent = "Saving...";
		if (currentlyEditing) {
			console.log("I should update this entry.");
		} else {
			console.log("I am creating a new entry.");
		}
		let jsonText;
		let plainText;

		if (editorState) {
			jsonText = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
			console.log("Plain text: ")
			plainText = (editorState.getCurrentContent().getPlainText());
			
		} else {
			jsonText = JSON.stringify([{}]);
		}

		console.table({
			title: titleInput.current.value,
			text: jsonText,
			mood: selectedMood,
			geminiEnabled: geminiToggle.current.checked
		});
		
		if (geminiToggle.current.checked) {
			geminiResponseDiv.current.scrollIntoView();
		}

		if (geminiToggle.current.checked) {	
			axios.post(import.meta.env.VITE_API_URL + "/diary_entry", {
				uid: currentUser.uid,
				text: plainText,
			})
			.then((res) => {
				console.log(res.message);
			})
			.catch((err) => {console.error(err)})
		}

		
		addJournalEntryToDatabase(titleInput.current.value, jsonText, plainText, timestamp, geminiToggle.current.checked, selectedMood)
			.then( async (timestamp) => {
				setTimestamp(timestamp);
				setGeminiResponding(true);
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
			<>
				<div className="backContainer">
					<button className="goBack" onClick={() => navigate("/app-jou")}>
						{"< Go Back"}
					</button>
				</div>

				{error ? (
					<div className="errorMessage">{error}</div>
				) : (
					<>
						<div className="topBar">
							{
								(mode === "edit") ? (
								<div className="geminiEnable popup" aria-label="Activate Gemini for personalized responses. Data auto-deletes after response generation.">
									<span>Enable AI</span>
									<input type="checkbox" 
											id="switch" 
											className="geminiToggle" 
											ref={geminiToggle}
											defaultChecked={geminiEnabledOrNot}
											onClick={geminiEnableToggle}
											disabled={(mode === "view")} 
									/>
									<label for="switch">Toggle</label>
								</div>
								) : (
									<button>
										{
											geminiEnabledOrNot ? "AI Enabled" : "AI Disabled"
										}
									</button>
								)
							}
							
							<div
								className={"mood " + (mode === "edit" ? "edit" : "")}
								onClick={() => {
									if (mode === "edit") {
										setMoodsOpen((moodsOpen) => !moodsOpen);
									}
								}}
								onBlur={() => setMoodsOpen(false)}
							>
								{React.cloneElement(
									moodOptions.value.find((mood) => mood.number === selectedMood).icon,
									{
										size: "20px",
									}
								)}
								{/* <BsEmojiSmileFill className="dropbtn" /> */}
								<div className={"dropdown-content" + (moodsOpen ? " show" : "")}>
									{/* <ul className="moods-dropdown"> */}
									{moodOptions.value.map((mood, index) => {
										return (
											<div
												key={index}
												className="item"
												onClick={() => setSelectedMood(mood.number)}
											>
												<span className="icon">{mood.icon}</span>
												{/* <span className="name">{mood.number}</span> */}
											</div>
										);
									})}
									{/* </ul> */}
								</div>
							</div>

							{mode === "edit" ? (
								<button className="edit" onClick={saveEntry} ref={saveButton} title="Save Entry">
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

						{
							(geminiEnabledOrNot) ? (
								<div className="geminiResponse" ref={geminiResponseDiv}>
									<span className="niyaSays">Niya says:</span>
									<span className="response">
										{
											(geminiResponding) ? (
											"Generating response..." ) :
											( (geminiResponse) ? geminiResponse : "" )
										}
									</span>
								</div>
							) : (
								<></>
							)
						}
						

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
			</>

			{/* <Editor /> */}
		</div>
	);
}
