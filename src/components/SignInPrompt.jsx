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
	green,
	red,
} from "../scripts/Misc";

import { useAuth } from "../contexts/AuthContext";

import { useEffect } from "react";
import DefaultPPImage from "../assets/default_pp.png";
import BlankWhite from "../assets/white-1px.jpg";
import PromptOverlay from "./PromptOverlay";
import { CSSTransition } from "react-transition-group";

import "../styles/SignInPrompt.scss";

function SignInPrompt(props) {
	const {
		signup,
		changedisplayname,
		writeUserMetaData,
		writeUserMiscData,
		appendUsernameToUsernamesList,
		appendEmailToEmailsList,
		testWrite,
		writeUserToDatabase,
		readAllUsernames
	} = useAuth();
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

	const signupEmailInput = useRef();
	const signupPasswordInput = useRef();
	const signupDobInput = useRef();
	const signupUsernameInput = useRef();
	//!
	useEffect(() => {
		console.log("init signinprompt");
	}, []);

	const testWriting = () => {
		writeUserToDatabase("sampleUid", "Sabz", "sabzzz", "02-10-2004", "email@gmail.com");
	};

	const createNewWithEmail = (email, password, username, dateofbirth) => {
		console.table({ Email: email, Password: password, Username: username, DOB: dateofbirth });

		signup(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				green("Added user to auth")
				console.log(user);

				changedisplayname(getDisplayNameFromUserName(username))
					.then(() => {
						green("Changed displayname in auth!");
					})
					.catch((error) => {
						console.warn(error.message);
						// return
					});
				writeUserToDatabase(user.uid, getDisplayNameFromUserName(username), username, dateofbirth, email);
				green("Created user, added to database!");

				// writeUserMetaData(user.uid, getDisplayNameFromUserName(username), username, email, dateofbirth)
				// 	.then(() => {
				// 		console.log("Successfully added record to databsae");
				// 		writeUserMiscData(user.uid)
				// 			.then(() => console.log("added user misc data"))
				// 			.catch(() => showInfoDiv("Trouble writing misc data."));

				// 		appendUsernameToUsernamesList(user.uid, username)
				// 			.then(() => console.log("Added username to usename list"))
				// 			.catch((e) => console.error(e));

				// 		appendEmailToEmailsList(user.uid, email)
				// 			.then(() => console.log("Added email to emails list"))
				// 			.catch((e) => console.error(e));
				// 	})
				// 	.catch((error) => {
				// 		console.error(error);
				// 		showInfoDiv("Errro in adding records to db");
				// 	});

				// showInfoDiv("Signup successful! Redirecting you back to login page", "success");

				// console.log(`navigating to login with data. ${(email, password, username)}`);

				// setTimeout(() => {
				//     navigate("/login", {
				//         state: { email: email, pwd: password },
				//     })
				// }, 2000)
			})

			.catch((error) => {
				console.log("we got error in creating user")
				red(error)
			});
	};

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
			setCurrentPage("signup");
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
			// setCurrentPage("login");
			// const emResp = validateEmail(emailInput.current.value);
			// const daResp = validateDate(dateInput.current.value);

			// if (emResp === true) {
			// 	if (daResp === true) {
			// 		setEmailText(emailInput.current.value);
			// 		setDateText(dateInput.current.value);
			createNewWithEmail(
				signupEmailInput.current.value,
				signupPasswordInput.current.value,
				signupUsernameInput.current.value,
				signupDobInput.current.value
			);
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
						<div className="welcome-text">
							{currentPage === "login" ? "Welcome back." : "Create an account"}
						</div>
						<div className="page-switcher">
							<div className="switch-wrapper">
								<div className="login-switch" onClick={() => setCurrentPage("login")}>
									<span>Login</span>
								</div>
								<div className="signup-switch" onClick={() => setCurrentPage("signup")}>
									<span>Sign Up</span>
								</div>
							</div>
						</div>
						<div className="switch-wrapper">
							<div
								className="switch-indicator"
								style={{ marginLeft: currentPage === "login" ? "0" : "calc(50%)" }}
							></div>
						</div>

						{/* <CSSTransition in={true} timeout={500} classNames="gotopage1anim" unmountOnExit>
							<button className="gotopage1-btn" onClick={handleGotoLogin}>
								{"<"}
							</button>
						</CSSTransition> */}
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
											<h4 style={{ fontWeight: "normal" }}>Enter username or email</h4>
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
											<h4 style={{ fontWeight: "normal" }}>Enter your password</h4>

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
												ref={signupEmailInput}
												defaultValue={emailText}
												tabIndex="0"
											></input>
										</div>
										<div className="email_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your preferred username</h4>
											<input
												type="text"
												className="email_entry"
												key={3}
												ref={signupUsernameInput}
												// defaultValue={emailText}
												tabIndex="0"
											></input>
										</div>
										<div className="date_container">
											<h4 style={{ fontWeight: "normal" }}>Create a strong password</h4>

											<div className="dateinput">
												<input type="password" key={4} ref={signupPasswordInput} />
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
										<div className="date_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your DOB</h4>
											<input
												type="date"
												className="date_entry"
												key={4}
												ref={signupDobInput}
												defaultValue={dateText}
												tabIndex="0"
											/>
										</div>
									</form>
								</div>
							</CSSTransition>
						</div>
					</div>

					<div className="btn_link_container">
						<button className="next_step_btn" onClick={handlePrimaryBtnClick} ref={primaryBtn}>
							{" "}
							<span ref={primaryBtnText}> {currentPage === "login" ? "Login" : "Sign Up"} </span>
						</button>
					</div>
				</div>
			</PromptOverlay>
		</CSSTransition>
	);
}

export default SignInPrompt;
