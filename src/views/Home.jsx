import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Home.scss";
import avatarThat from "../assets/pointing_at_that.png";
import ImageRenderer from "../components/ImageRenderer";
import { getTimeBasedGreeting } from "../scripts/Misc";
import { MdWavingHand } from "react-icons/md";
import useArray from "../hooks/useArray";

export default function Home() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const suggestedActivities = useArray([
		{ text: "Write a journal entry", url: "/journal" },
		{ text: "Disease identification", url: "/app-id" },
		{ text: "Get a random quote", url: "/quotes" },
	]);

	useEffect(() => {
		// navigate("/hero")
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
					<ImageRenderer className="avatarRender" url={avatarThat} />
				</div>
				<div className="suggestionsContainer">
					<div className="suggestionsTitle">Here are some things for you to do:</div>
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
