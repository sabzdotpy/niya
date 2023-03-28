import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom'

import { useEffect } from "react";
import DefaultPPImage from "../assets/default_pp.png";
import BlankWhite from "../assets/white-1px.jpg";
// import { FiX, FiTrash2 } from "react-icons/fi";
import PromptOverlay from "./PromptOverlay";
import { CSSTransition } from "react-transition-group";

import "../styles/SignInPrompt.scss";

function SignInPrompt(props) {
	useEffect(() => {
		console.log("init signinprompt");
	}, []);

	return (
		<CSSTransition in={props.in} timeout={200} classNames="promptanim" unmountOnExit>
			<PromptOverlay {...props}>
				<div className="accounts_list">
					{props.accountsList?.length ? (
						props.accountsList.map((account, index) => {
							return (
								<div
									className={"account account" + `${index}`}
									key={account.uid}
									onClick={() => props.signInFunction()}
								>
									<img
										src={account.photoURL || DefaultPPImage}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null; // prevents looping
											currentTarget.src = BlankWhite;
										}}
										className="profile_pic"
										alt="profile picture"
									/>
									<div className="name">{account.displayName}</div>
									<div className="trash_container">
										{/* <FiTrash2
											className="trash_icon"
											size="20px"
											title="Remove this account from device"
											onClick={(e) => {
												e.stopPropagation();
												props.signOutFunction();
												props.accountsList.pop(index);
											}}
										/> */}
									</div>
								</div>
							);
						})
					) : (
						<span> {"no saved accounts! :("} </span>
					)}
				</div>
			</PromptOverlay>
		</CSSTransition>
	);
}

export default SignInPrompt;
