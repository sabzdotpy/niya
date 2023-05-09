import "../styles/Journal.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useArray from "../hooks/useArray";
import { green } from "../scripts/Misc";

export default function Journal() {
	const navigate = useNavigate();
	const { currentUser, readAllJournalEntries } = useAuth();
	const journalEntries = useArray([]);

	const entries = [
		{ title: "My first entry!", text: "Today is the ...", date: "31 December" },
		{ title: "New year!", text: "This year is going to be a good one..", date: "01 January" },
		{ title: "I am dead inside", text: "Worst year so far", date: "03 January" },
	];

	useEffect(() => {
		console.log("Reading entries...")
		let temp = [];
		readAllJournalEntries()
		.then((entries) => {
			(Object.getOwnPropertyNames(entries)).map((timestamp) => {
				// journalEntries.push(entries[timestamp])

				temp.push( {data: entries[timestamp]} )

				// temp[timestamp] = entries[timestamp]
			})
			console.log(temp)
			temp.map((item) => {
				console.log(item.timestamp)
			})
			journalEntries.setValue(temp)

		})
		.catch((e) => {
			console.log("error in reading all journal entries")
			console.log(e)
		})
	}, [currentUser]);

	return (
		<div className="Journal">
			<div className="journalContent">
				<div className="jounralInfo">You have written {journalEntries.value?.length} journal entries so far!</div>
				<div className="journalList">
					{journalEntries.value?.map((entry, index) => {
						return (
							<div className="journalEntry" key={index} onClick={() => console.log(journalEntries.value)}>
								<span className="titleAndDateContainer">
									<span className="title">{entry.data.title}</span>
									<span className="date">{new Date(entry.data.timestamp).getDate()}</span>
								</span>
								<span className="text">{JSON.parse(entry.data.text).blocks[0].text}</span>
							</div>
						);
					})}
				</div>
			</div>

			<button className="addEntry" onClick={() => navigate("/app-jou/new")}>
				+
			</button>
		</div>
	);
}
