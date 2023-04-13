import "../styles/Accounts.scss";

import { BiTrash, BiEdit } from "react-icons/all";

import DefaultProfilePicture from "../assets/default_pp.png";
import ImageRenderer from "../components/ImageRenderer";
import { useAuth } from "../contexts/AuthContext";

export default function Accounts(props) {
	const { currentUser } = useAuth();
	return (
		<div className="Accounts">
			<div className="accountContainer">
				{!currentUser || currentUser === "none" ? (
					<div className="noUser">Please login to see account details</div>
				) : (
					<>
						<div className="accountDetails">
							<div className="accountAvatarContainer">
								<ImageRenderer url={DefaultProfilePicture} height={"150px"} width={"150px"} />
								<div className="buttonsContainer">
									<span className="changeImage" title="Upload an image">
										<BiEdit size={"25px"} />
									</span>
									<span className="removeImage" title="Delete profile image">
										<BiTrash size={"25px"} />
									</span>
								</div>
							</div>
							<div className="accountDetailsContainer">
								<span className="username">@username</span>
								<span>{currentUser.displayName || "Display name"}</span>
								<span>email@provider.com</span>
								<span>Created 6 days ago</span>
							</div>
						</div>

						<div className="accountEdit">
							<span>Edit Profile</span>
							<span>Change Username</span>
							<span>Change Display Name</span>
							<span>Update Other Account Details</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
