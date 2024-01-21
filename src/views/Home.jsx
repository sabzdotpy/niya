import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Home.scss";

import avatarThat from "../assets/pointing_at_that.png";
import avatarHidden from "../assets/hidden.png";
import ImageRenderer from "../components/ImageRenderer";
import { getTimeBasedGreeting } from "../scripts/Misc";
import { MdWavingHand } from "react-icons/md";
import useArray from "../hooks/useArray";

export default function Home() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const suggestedActivities = useArray([
		{ text: "Disease identification", url: "/app-ide" },
		{ text: "Write a journal entry", url: "/app-jou" },
		{ text: "Chat!", url: "/chat" },
	]);

	const suggestionsText = useArray([
		"Here are some things for you to do",
		"Here are some things you can do",
		"These are some suggested activities for you",
		"Pick one!",
		"How about we do one of this?",
	]);

	useEffect(() => {
		// navigate("/hero")

		// fetch(import.meta.env.VITE_BACKEND).then((res) => res.json().then((data) => {
		// 	console.log(data)
		// 	console.log("DATA")
		// }))
	}, []);

	return (
		<div className="Home">
			<div className="mainWelcomeText">
				{currentUser && currentUser !== "none" ? (
					<span>
						{`${getTimeBasedGreeting()}, ` + currentUser.displayName} <MdWavingHand size={30} />{" "}
					</span>
				) : (
					"Consider signing in to access all the features."
				)}
			</div>
			<div className="mainContent">
				<div className="avatarContainer">
					<div className="avatarOffset"></div>
					<span className="avatarRenderDesktop">
						<ImageRenderer url={avatarThat} height={"400px"} />
					</span>
					<span className="avatarRenderMobile">
						<ImageRenderer url={avatarHidden} width={"250px"} />
					</span>
				</div>
				<div className="suggestionsContainer">
					<div className="suggestionsTitle">
						{suggestionsText.value[Math.floor(Math.random() * (suggestionsText.value.length))]}
					</div>
					<div className="suggestionActivities">
						{suggestedActivities.value.map((activity, index) => {
							return (
								<div
									className="activity"
									key={index}
									onClick={() => {
										navigate(activity.url);
									}}
								>
									{activity.text}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
