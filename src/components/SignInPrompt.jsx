import React, { useState, useRef } from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom'

import "../styles/LoginSignupSwitch.scss";

import {
	validateEmail,
	validateUsername,
	validatePassword,
	validateDate,
	getDisplayNameFromUserName,
	getErrorFromCode,
} from "../scripts/Misc";

import { useEffect } from "react";
import DefaultPPImage from "../assets/default_pp.png";
import BlankWhite from "../assets/white-1px.jpg";
import PromptOverlay from "./PromptOverlay";
import { CSSTransition } from "react-transition-group";

import "../styles/SignInPrompt.scss";

function SignInPrompt(props) {
	//!
	const [currentPage, setCurrentPage] = useState("login");
	const [passwordVisible, changePasswordVisibility] = useState(false);

	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [usernameText, setUsernameText] = useState("");
	const [dateText, setDateText] = useState("");

	//!
	const usernameInput = useRef(null);
	const emailInput = useRef(null);
	const pwdInput = useRef(null);
	const dateInput = useRef(null);
	const pwdToggler = useRef(null);
	const primaryBtn = useRef(null);
	const primaryBtnText = useRef(null);
	const topMessage = useRef(null);
	const infoDiv = useRef(null);
	//!
	useEffect(() => {
		console.log("init signinprompt");
	}, []);

	const handleGotoLogin = () => {
		setCurrentPage("login");
		// setEmailText(emailInput.current.value);
		// setDateText(dateInput.current.value);
		// primaryBtnText.current.innerText = "Login";
		// usernameInput.current.focus()
	};

	const unameChange = () => {
		// validateUsername(usernameInput.current.value)
		// TODO: show updates based on response from validate fn.
	};

	const togglePwdVisibility = () => {
		pwdInput.current.type = passwordVisible ? "password" : "text";
		changePasswordVisibility((passwordVisible) => !passwordVisible);
	};

	const handlePrimaryBtnClick = () => {
		if (currentPage === "login") {
			// * validate email, pwd
			setCurrentPage("signup")
			// console.log("primary btn click");
			// const unameResp = validateUsername(usernameInput.current.value);
			// const pwdResp = validatePassword(pwdInput.current.value);

			// if (unameResp === true) {
			// 	if (pwdResp === true) {
			// 		setUsernameText(usernameInput.current.value);
			// 		setPasswordText(pwdInput.current.value);
			// 		setCurrentPage("signup");
			// 		primaryBtnText.current.innerText = "Sign Up";
			// 		topMessage.current.innerText = "Almost there!";
			// 	} else {
			// 		console.log("pwd wrong");
			// 		// showInfoDiv(pwdResp);
			// 		pwdInput.current.focus();
			// 	}
			// } else {
			// 	console.log("username invalid");
			// 	// showInfoDiv(unameResp);
			// 	usernameInput.current.focus();
			// }
		} else if (currentPage === "signup") {
			// * validate displayname, bday, location, pic
			setCurrentPage("login")
			// const emResp = validateEmail(emailInput.current.value);
			// const daResp = validateDate(dateInput.current.value);

			// if (emResp === true) {
			// 	if (daResp === true) {
			// 		setEmailText(emailInput.current.value);
			// 		setDateText(dateInput.current.value);
			// 		createNewWithEmail(emailInput.current.value, passwordText, usernameText, dateInput.current.value);
			// 	} else {
			// 		// showInfoDiv(daResp);
			// 	}
			// } else {
			// 	// showInfoDiv(emResp);
			// 	// emailInput.current.focus()
			// }
		}
	};

	return (
		<CSSTransition in={props.in} timeout={200} classNames="promptanim" unmountOnExit>
			<PromptOverlay {...props}>
				<div className="app" onClick={(e) => e.stopPropagation()}>
					<div className="title_container">
						Login
						<CSSTransition in={true} timeout={500} classNames="gotopage1anim" unmountOnExit>
							<button className="gotopage1-btn" onClick={handleGotoLogin}>{"<"}</button>
						</CSSTransition>
					</div>

					<div className="page-container">
						<div className="page_inner">
							<CSSTransition
								in={currentPage === "login"}
								timeout={500}
								classNames="signup-page1"
								unmountOnExit
							>
								<div className="page page1">
									<form className="container input_container">
										<div className="uname_container">
											<h4 style={{ fontWeight: "normal" }}>Choose a username</h4>
											<input
												type="text"
												autoComplete="new-password"
												className="uname_entry"
												ref={usernameInput}
												key={1}
												defaultValue={usernameText}
												onChange={unameChange}
												tabIndex="0"
											/>
										</div>
										<div className="pwd_container">
											<h4 style={{ fontWeight: "normal" }}>Enter a strong password</h4>

											<div className="pwdinp_btn">
												<input
													type="password"
													autoComplete="new-password"
													className="password_entry"
													ref={pwdInput}
													key={2}
													defaultValue={passwordText}
													tabIndex="0"
												/>
												<div
													className="showhide"
													ref={pwdToggler}
													onClick={togglePwdVisibility}
												>
													{" "}
													{/* {!passwordVisible ? <FiEye /> : <FiEyeOff />} */}
													{!passwordVisible ? "o" : "x"}
												</div>
											</div>
										</div>
									</form>
								</div>
							</CSSTransition>
							{/* : */}
							<CSSTransition
								in={currentPage === "signup"}
								timeout={500}
								classNames="signup-page2"
								unmountOnExit
							>
								<div className="page page2">
									<form className="container extra_container">
										<div className="email_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your email id</h4>
											<input
												type="text"
												className="email_entry"
												key={3}
												ref={emailInput}
												defaultValue={emailText}
												tabIndex="0"
											></input>
										</div>
										<div className="date_container">
											<h4 style={{ fontWeight: "normal" }}>Date of Birth</h4>

											<div className="dateinput">
												<input
													type="date"
													className="date_entry"
													key={4}
													ref={dateInput}
													defaultValue={dateText}
													tabIndex="0"
												/>
											</div>
										</div>
									</form>
								</div>
							</CSSTransition>
						</div>
					</div>

					<div className="btn_link_container">
						<button className="next_step_btn" onClick={handlePrimaryBtnClick} ref={primaryBtn}>
							{" "}
							<span ref={primaryBtnText}>Go to next page</span>
						</button>
					</div>
				</div>
			</PromptOverlay>
		</CSSTransition>
	);
}

export default SignInPrompt;
