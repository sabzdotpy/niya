import "../styles/Journal.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { green } from "../scripts/Misc";

export default function Journal() {
	const navigate = useNavigate();
	const { currentUser, JOURNAL_ENTRIES, readAndSetJournalEntries } = useAuth();

	useEffect(() => {
		console.log("Reading entries...");
		readAndSetJournalEntries();
	}, [currentUser]);

	return (
		<div className="Journal">
			<div className="journalContent">
				{currentUser && currentUser !== "none" ? (
					<>
						<div className="jounralInfo" onClick={() => console.log(JOURNAL_ENTRIES.value)}>
							You have written {JOURNAL_ENTRIES.value?.length} journal entries so far!
						</div>
						<div className="journalList">
							{JOURNAL_ENTRIES.value?.map((entry, index) => {
								return (
									<div
										className="journalEntry"
										key={index}
										onClick={() => navigate(`/app-jou/${Object.values(entry)[0].timestamp}`)}
									>
										<span className="titleAndDateContainer">
											<span className="title">{Object.values(entry)[0].title}</span>
											<span className="date">
												{new Date(Object.values(entry)[0].timestamp)
													.toLocaleDateString("default", { month: "long" })
													.slice(0, 4) +
													" " +
													new Date(Object.values(entry)[0].timestamp).getDate()}
											</span>
										</span>
										<span className="text">
											{JSON.parse(Object.values(entry)[0].text).blocks[0].text}
										</span>
									</div>
								);
							})}
						</div>

						<button className="addEntry" onClick={() => navigate("/app-jou/new")}>
							+
						</button>
					</>
				) : (
					<div className="loginBlock">You don't seem to be logged in. Please login to use the journal.</div>
				)}
			</div>
		</div>
	);
}
