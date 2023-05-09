import "../styles/Journal.scss";

import {useNavigate} from "react-router-dom";

export default function Journal() {

    const navigate = useNavigate();

	const entries = [
		{ title: "My first entry!", text: "Today is the ...", date: "31 December" },
		{ title: "New year!", text: "This year is going to be a good one..", date: "01 January" },
		{ title: "I am dead inside", text: "Worst year so far", date: "03 January" },
	];

	return (
		<div className="Journal">
			<div className="journalContent">
				<div className="jounralInfo">You have written {entries.length} journal entries so far!</div>
				<div className="journalList">
					{entries.map((entry, index) => {
						return (
							<div className="journalEntry" key={index}>
								<span className="titleAndDateContainer">
									<span className="title">{entry.title}</span>
									<span className="date">{entry.date}</span>
								</span>
								<span className="text">{entry.text}</span>
							</div>
						);
					})}
				</div>
			</div>

			<button className="addEntry" onClick={() => navigate("/app-jou/new") }>+</button>
		</div>
	);
}
