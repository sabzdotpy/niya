import "../styles/Accounts.scss";

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { BiTrash, BiEdit } from "react-icons/all";

import DefaultProfilePicture from "../assets/default_pp.png";
import ImageRenderer from "../components/ImageRenderer";
import ChangeDisplayName from "../components/ChangeDisplayName";
import { useAuth } from "../contexts/AuthContext";
import { daysBetween } from "../scripts/Misc";

export default function Accounts(props) {
	const { currentUser, getUsernameFromUid, signout } = useAuth();

	const [username, setUsername] = useState("?");
	const [showDisplayNameChangeModal, setShowDisplayNameChangeModal] = useState(false);
	const [setShowLogin, pushToNotifications] = useOutletContext();

	useEffect(() => {
		if (currentUser && currentUser !== "none") {
			getUsernameFromUid(currentUser.uid)
				.then((username) => {
					setUsername(username);
				})
				.catch((erroredUsername) => {
					setUsername(erroredUsername);
				});
		}
	}, [currentUser]);
	return (
		<div className="Accounts">
			<ChangeDisplayName in={showDisplayNameChangeModal} closeOverlay={() => setShowDisplayNameChangeModal(false)} />
			<div className="accountContainer">
				{!currentUser || currentUser === "none" ? (
					<div className="noUser">Please login to see account details</div>
				) : (
					<>
						<div className="accountDetails">
							<div className="accountAvatarContainer">
								<ImageRenderer url={DefaultProfilePicture} height={"150px"} width={"150px"} />
								<div className="buttonsContainer">
									<span className="changeImage" title="Upload an image" onClick={() => pushToNotifications("", "Content not yet developed.", "info")}>
										<BiEdit size={"25px"} />
									</span>
									<span className="removeImage" title="Delete profile image" onClick={() => pushToNotifications("", "Content not yet developed.", "info")}>
										<BiTrash size={"25px"} />
									</span>
								</div>
							</div>
							<div className="accountDetailsContainer">
								<span className="username">@{username}</span>
								<span>{currentUser.displayName || "Display name"}</span>
								<span>{currentUser.email}</span>
								<span>
									Created{" "}
									{Math.floor(
										daysBetween(new Date(parseInt(currentUser.metadata.createdAt)), new Date())
									)}{" "}
									days ago
								</span>
							</div>
						</div>

						<div className="accountEdit">
							<span onClick={() => pushToNotifications("", "Content not yet developed.", "info")}>Edit Profile</span>
							<span onClick={() => pushToNotifications("", "Content not yet developed.", "info")}>Change Username</span>
							<span onClick={() => setShowDisplayNameChangeModal(true)}>Change Display Name</span>
							<span onClick={() => pushToNotifications("", "Content not yet developed.", "info")}>Update Other Account Details</span>
							<span onClick={signout}>Sign out</span>

						</div>
					</>
				)}
			</div>
		</div>
	);
}
