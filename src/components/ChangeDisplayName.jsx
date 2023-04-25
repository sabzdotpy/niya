import { CSSTransition } from "react-transition-group";
import PromptOverlay from "./PromptOverlay";
import { useAuth } from "../contexts/AuthContext";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

import "../styles/PromptOverlay.scss";
import "../styles/ChangeDisplayName.scss";

export default function ChangeDisplayName(props) {
	const { currentUser, changeToCustomDisplayName } = useAuth();
	const newDisplayName = useRef();
	const [setShowLogin, pushToNotifications] = useOutletContext();

	return (
		<CSSTransition in={props.in} timeout={200} classNames="promptanim" unmountOnExit>
			<PromptOverlay {...props} header={"Change DisplayName"}>
				<div className="change">
					<div className="prev">
						<span>Previously:</span>{" "}
						<input type="text" disabled value={currentUser?.displayName} onChange={() => {}} />
					</div>
					<div className="to">
						<span>Change to:</span> <input type="text" ref={newDisplayName} />
					</div>

					<div className="done">
						<button
							onClick={() => {
								if (newDisplayName.current.value) {
									changeToCustomDisplayName(newDisplayName.current.value);
									pushToNotifications("Success!", "Display name changed successfully!", "success");
									setTimeout(() => props.closeOverlay(), 400)
								} else {
									pushToNotifications("Error", "Enter a valid name", "alert");
								}
							}}
						>
							Done
						</button>
					</div>
				</div>
			</PromptOverlay>
		</CSSTransition>
	);
}
