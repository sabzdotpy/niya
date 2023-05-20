import "../styles/Journal.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { green } from "../scripts/Misc";
import LoadingScreen from "../components/LoadingScreen";

export default function Journal() {
	const navigate = useNavigate();
	const { currentUser, JOURNAL_ENTRIES, readAndSetJournalEntries } = useAuth();
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		if (currentUser && currentUser !== "none") {
			setShowLoading(true);
			console.log("Reading entries...");
			readAndSetJournalEntries()
				.then(() => {
					console.log(JOURNAL_ENTRIES.value);
					setShowLoading(false);
				})
				.catch(() => {
					console.log(JOURNAL_ENTRIES.value);
					setShowLoading(false);
				});
		} else {
			setShowLoading(false);
		}
	}, [currentUser]);

	return (
		<div className="Journal">
			<div className="journalContent">
				<LoadingScreen in={showLoading} unmountOnExit transparent noprompt />
				{currentUser && currentUser !== "none" ? (
					<>
						{JOURNAL_ENTRIES.value ? (
							<div className="jounralInfo" onClick={() => console.log(JOURNAL_ENTRIES.value.length)}>
								{JOURNAL_ENTRIES.value?.length > 0
									? `You have written ${JOURNAL_ENTRIES.value?.length} journal entries so far!`
									: "You haven't written a jounral entry yet. Let's start."}
							</div>
						) : (
							<></>
						)}

						<div className="journalList">
							{JOURNAL_ENTRIES.value.length ? (
								JOURNAL_ENTRIES.value.map((entry, index) => {
									return (
										<div
											className="journalEntry"
											key={index}
											onClick={() => navigate(`/app-jou/${Object.values(entry)[0].timestamp}`)}
										>
											<span className="titleAndDateContainer">
												<span className="title">{Object.values(entry)[0]?.title}</span>
												<span className="date">
													{new Date(Object.values(entry)[0]?.timestamp)
														.toLocaleDateString("default", { month: "long" })
														.slice(0, 3) +
														" " +
														new Date(Object.values(entry)[0]?.timestamp).getDate()}
												</span>
											</span>
											<span className="text">
												{/* JSON.parse(Object.values(entry)[0]?.text)[0] === {} */}
												{JSON.parse(Object.values(entry)[0]?.text)[0] && // 👈 null and undefined check
												Object.keys(JSON.parse(Object.values(entry)[0]?.text)[0]).length ===
													0 &&
												Object.getPrototypeOf(JSON.parse(Object.values(entry)[0]?.text)[0]) ===
													Object.prototype
													? ""
													: (JSON.parse(Object.values(entry)[0]?.text).blocks[0]?.text.length > 100)
													? JSON.parse(Object.values(entry)[0]?.text).blocks[0]?.text.slice(0,100) + "..."
													: JSON.parse(Object.values(entry)[0]?.text).blocks[0]?.text}

											</span>
										</div>
									);
								})
							) : (
								<></>
							)}
						</div>

						<button className="addEntry" onClick={() => navigate("/app-jou/new")}>
							+
						</button>
					</>
				) : currentUser === "none" ? (
					<div className="loginBlock">You don't seem to be logged in. Please login to use the journal.</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
