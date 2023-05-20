import { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, BarChart, CartesianGrid, Bar } from "recharts";

import { AiFillSmile } from "react-icons/ai";

import "../styles/MoodTracker.scss";
import { useAuth } from "../contexts/AuthContext";
import { red } from "../scripts/Misc";
import useArray from "../hooks/useArray";

export default function MoodTracker() {
	const { currentUser, JOURNAL_ENTRIES, readAndSetJournalEntries } = useAuth();

	const [showMoodInfo, setShowMoodInfo] = useState(true);

	const data = useArray();

	const parseJournalEntries = (entries) => {
		const moodIndices = ["Good", "Sad", "Angry", "Meh", "Love", "Haha", "Wink", "Cool"];

		const moodCount = {
			Good: 0,
			Sad: 0,
			Angry: 0,
			Meh: 0,
			Love: 0,
			Haha: 0,
			Wink: 0,
			Cool: 0,
		};

		red("Ayyyyyyyyyy");

		// entries.filter((entry, index) => {
		//     return {name: moodIndices.at(entry.mood+1)}
		// })

		entries.map((entry, index) => {
			moodCount[moodIndices.at(Object.values(entry)[0]?.mood + 1)] += 1;
		});

		const parsed = Object.keys(moodCount).map((moodKey, index) => {
			return {
				name: moodKey,
				Count: moodCount[moodKey],
			};
		});

		console.log(parsed);
		data.setValue(parsed);
	};

	const readEntries = () => {
		readAndSetJournalEntries()
			.then((val) => {
				console.log("[MoodTracker] Read resolved.");
				console.log(JOURNAL_ENTRIES);
				parseJournalEntries(JOURNAL_ENTRIES.value);
			})
			.catch((e) => {
				console.warn("[MoodTracker] Read rejected.");
				console.log(e);
			});
	};

	useEffect(() => {
		if (JOURNAL_ENTRIES.value.length < 1) {
			red("[MoodTracker] Journal has no entries or entries not yet received.");
			console.log("[MoodTracker] Trying to read and set journal entries again.");
			readEntries();
		}

		console.log(JOURNAL_ENTRIES.value);
	}, []);

	useEffect(() => {
		if (currentUser) {
			readEntries();
		}
	}, [currentUser]);

	return (
		<div className="MoodTracker">
			{showMoodInfo ? (
				<div className="moodInfo brownText">
					<div className="text">
						This is Niya's mood tracker. You can see the number of times you have logged your mood when
						writing journals.
					</div>
					<div className="close" onClick={() => setShowMoodInfo(false)}>
						x
					</div>
				</div>
			) : (
				<></>
			)}

			{data.value.length > 0 ? (
				<BarChart width={600} height={250} data={data.value}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="Count" fill="#c66224" />
					{/* <Bar dataKey="uv" fill="#82ca9d" /> */}
				</BarChart>
			) : (
				<div className="brownText">No journal entries found to track.</div>
			)}

			{/* <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="count" stroke="#8884d8" />
			</LineChart> */}
		</div>
	);
}
