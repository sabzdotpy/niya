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

import { FiEye, FiEyeOff } from "react-icons/fi";
import { browserLocalPersistence } from "firebase/auth";
import { onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

function SignInPrompt(props) {
	const {
		signup,
		signin,
		changedisplayname,
		setpersistence,
		writeUserMetaData,
		writeUserMiscData,
		appendUsernameToUsernamesList,
		appendEmailToEmailsList,
		testWrite,
		writeUserToDatabase,
		readAllUsernames,
		getEmailFromUsername,
	} = useAuth();
	const navigate = useNavigate();
	//!
	const [currentPage, setCurrentPage] = useState("login");
	const [loginPwdVisible, changeLoginPwdVisible] = useState(false);
	const [signupPwdVisible, changeSignupPwdVisible] = useState(false);

	// const [emailText, setEmailText] = useState("");
	// const [passwordText, setPasswordText] = useState("");
	// const [usernameText, setUsernameText] = useState("");
	// const [dateText, setDateText] = useState("");

	const [signupEmailText, setSignupEmailText] = useState("signupemail@gmail.com");
	const [signupPasswordText, setSignupPasswordText] = useState("password");
	const [signupDobText, setSignupDobText] = useState("");
	const [signupUsernameText, setSignupUsernameText] = useState("signup_username");

	const [loginUsernameOrEmailText, setLoginUsernameOrEmailText] = useState("login_username");
	const [loginPasswordText, setLoginPasswordText] = useState("password");

	//!

	const pwdInput = useRef(null);
	const primaryBtn = useRef(null);
	const primaryBtnText = useRef(null);
	const topMessage = useRef(null);
	const infoDiv = useRef(null);

	const signupEmailInput = useRef();
	const signupPasswordInput = useRef();
	const signupDobInput = useRef();
	const signupUsernameInput = useRef();

	const loginUsernameInput = useRef();
	const loginPasswordInput = useRef();

	const loginPwdToggler = useRef(null);
	const signupPwdToggler = useRef(null);
	//!
	useEffect(() => {
		console.log("init signinprompt");
	}, []);

	const clearAllInputTexts = () => {
		setSignupEmailText("");
		setSignupPasswordText("");
		setSignupDobText("");
		setSignupUsernameText("");
		setLoginUsernameOrEmailText("");
		setLoginPasswordText("");
	};

	const createNewWithEmail = (email, password, username, dateofbirth) => {
		console.table({ Email: email, Password: password, Username: username.toLowerCase(), DOB: dateofbirth });

		signup(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				primaryBtnText.current.innerText = "Signing up...";
				green("Added user to auth");
				console.log(user);

				changedisplayname(getDisplayNameFromUserName(username))
					.then(() => {
						green("Changed displayname in auth!");
					})
					.catch((error) => {
						console.warn(error.message);
						// return
					});
				writeUserToDatabase(user.uid, getDisplayNameFromUserName(username), username.toLowerCase(), dateofbirth, email);
				green("Created new user!");

				props.pushToNotifications("Success", "Your account has been created successfully", "success");
				primaryBtnText.current.innerText = "Sign Up";
				setTimeout(() => {
					props.pushToNotifications("Logging in", "Logging you in with created account credentials", "info");
					signin(email, password).then(() => {
						props.closeOverlay();
						clearAllInputTexts();
						navigate("/");
					});
				}, 1500);

				// showInfoDiv("Signup successful! Redirecting you back to login page", "success");

				// console.log(`navigating to login with data. ${(email, password, username)}`);

				// setTimeout(() => {
				//     navigate("/login", {
				//         state: { email: email, pwd: password },
				//     })
				// }, 2000)
			})

			.catch((error) => {
				console.log("we got error in creating user");
				red(error);
				red(getErrorFromCode(error.code));
				// alert(getErrorFromCode(error.code));
				props.pushToNotifications("Error", getErrorFromCode(error.code), error);
			});
	};

	const gotoPage = (page) => {
		if (page === "login") {
			setSignupEmailText(signupEmailInput.current?.value);
			setSignupPasswordText(signupPasswordInput.current?.value);
			setSignupUsernameText(signupUsernameInput.current?.value);
			setSignupDobText(signupDobInput.current?.value);

			setCurrentPage("login");
		} else if (page === "signup") {
			setLoginUsernameOrEmailText(loginUsernameInput.current?.value);
			setLoginPasswordText(loginPasswordInput.current?.value);

			setCurrentPage("signup");
		}
	};

	const unameChange = () => {
		// validateUsername(usernameInput.current.value)
		// TODO: show updates based on response from validate fn.
	};

	const togglePwdVisibility = (page) => {
		if (page === "login") {
			loginPasswordInput.current.type = loginPwdVisible ? "password" : "text";
			changeLoginPwdVisible((loginPwdVisible) => !loginPwdVisible);
		} else if (page === "signup") {
			signupPasswordInput.current.type = signupPwdVisible ? "password" : "text";
			changeSignupPwdVisible((signupPwdVisible) => !signupPwdVisible);
		}
	};

	const handlePrimaryBtnClick = async () => {
		if (currentPage === "login") {

			console.log("clicked login button");
			primaryBtnText.current.innerText = "Signing in...";
			if (loginUsernameInput.current.value && loginPasswordInput.current.value) {
				let email;
				if (validateEmail(loginUsernameInput.current.value)) {
					console.log("email check passed");
					email = loginUsernameInput.current.value;
				} else if (validateUsername(loginUsernameInput.current.value)) {
					console.log("username check passed");
					try {
						email = await getEmailFromUsername(loginUsernameInput.current.value);
						console.log(email);
					} catch (readableError) {
						red(readableError);
						// alert(e);
						primaryBtnText.current.innerText = "Login";
						props.pushToNotifications("Error", readableError, "error");
						return;
					}
				}

				setLoginUsernameOrEmailText(loginUsernameInput.current.value);
				setLoginPasswordText(loginPasswordInput.current.value);

				setpersistence(browserLocalPersistence);
				console.log(`tryna sign in w email = ${email}`);
				signin(email, loginPasswordInput.current.value)
					.then((result) => {
						// Signed in
						const user = result.user;
						console.log(`Logged in as: ${user.displayName}`);
						clearAllInputTexts();
						props.closeOverlay();
						// navigate("/");
						primaryBtnText.current.innerText = "Login";
					})
					.catch((error) => {
						red(error);
						// alert(getErrorFromCode(error.code));
						primaryBtnText.current.innerText = "Login";
						props.pushToNotifications("Error", getErrorFromCode(error.code), "error");
					});
			} else {
				red("Please enter your username and password.");
				props.pushToNotifications("Missing fields", "Please enter your username and password.", "error");
			}
		} else if (currentPage === "signup") {
			// * validate displayname, bday, location, pic
			// setCurrentPage("login");
			console.table([signupEmailInput.current.value]);
			primaryBtnText.current.innerText = "Signing up...";
			const emResp = validateEmail(signupEmailInput.current.value);
			if (emResp !== true) {
				red("Email invalid");
				primaryBtnText.current.innerText = "Sign Up";
				props.pushToNotifications("Invalid", emResp, "error");
				return;
			}

			const usernameResp = await validateUsername(signupUsernameInput.current.value, readAllUsernames);
			if (usernameResp !== true) {
				console.log("username resp not equal to true");
				red(usernameResp);
				primaryBtnText.current.innerText = "Sign Up";
				// alert(usernameResp);
				props.pushToNotifications("Invalid", usernameResp, "error");
				return;
			}

			const passwordResp = validatePassword(signupPasswordInput.current.value);
			if (passwordResp !== true) {
				red("Password is invalid");
				primaryBtnText.current.innerText = "Sign Up";
				props.pushToNotifications("Invalid", passwordResp, "error");
				return;
			}

			const daResp = validateDate(signupDobInput.current.value);
			if (daResp !== true) {
				red("DOB invaild");
				primaryBtnText.current.innerText = "Sign Up";
				props.pushToNotifications("Invalid", daResp, "error");
				return;
			}

			setSignupEmailText(signupEmailInput.current.value);
			setSignupUsernameText(signupUsernameInput.current.value);
			setSignupPasswordText(signupPasswordInput.current.value);
			setSignupDobText(signupDobInput.current.value);

			createNewWithEmail(
				signupEmailInput.current.value,
				signupPasswordInput.current.value,
				signupUsernameInput.current.value,
				signupDobInput.current.value
			);
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
								<div className="login-switch" onClick={() => gotoPage("login")}>
									<span>Login</span>
								</div>
								<div className="signup-switch" onClick={() => gotoPage("signup")}>
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
							{/* //! ---------------- LOGIN PAGE ---------------------- */}
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
												ref={loginUsernameInput}
												key={1}
												defaultValue={loginUsernameOrEmailText}
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
													ref={loginPasswordInput}
													key={2}
													defaultValue={loginPasswordText}
													tabIndex="0"
												/>
												<div
													className="showhide"
													ref={loginPwdToggler}
													// onClick={() => togglePwdVisibility("login")}
													onClick={() => {
														togglePwdVisibility("login");
													}}
												>
													{" "}
													{/* {!passwordVisible ? <FiEye /> : <FiEyeOff />} */}
													{!loginPwdVisible ? <FiEye /> : <FiEyeOff />}
												</div>
											</div>
										</div>
									</form>
								</div>
							</CSSTransition>
							{/* : */}
							{/* //! ---------------- SIGNUP PAGE ------------------------- */}
							<CSSTransition
								in={currentPage === "signup"}
								timeout={500}
								classNames="signup-page2"
								unmountOnExit
							>
								<div className="page page2">
									<form className="container input_container">
										<div className="email_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your email id</h4>
											<input
												type="text"
												className="email_entry"
												key={3}
												ref={signupEmailInput}
												defaultValue={signupEmailText}
												tabIndex="0"
											></input>
										</div>
										<div className="email_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your preferred username</h4>
											<input
												type="text"
												className="email_entry"
												key={4}
												ref={signupUsernameInput}
												defaultValue={signupUsernameText}
												tabIndex="0"
											></input>
										</div>
										<div className="pwd_container signup">
											<h4 style={{ fontWeight: "normal" }}>Enter your password</h4>

											<div className="pwdinp_btn">
												<input
													type="password"
													autoComplete="new-password"
													className="password_entry"
													ref={signupPasswordInput}
													key={5}
													defaultValue={signupPasswordText}
													tabIndex="0"
												/>
												{/* <div
													className="showhide"
													ref={signupPwdToggler}
													onClick={() => togglePwdVisibility("signup")}
												>
													{!signupPwdVisible ? "o" : "x"}
												</div> */}

												{/* ! FIND A WAY TO BRING SHOWHIDE INTO THE INPUT */}
											</div>
										</div>
										<div className="date_container">
											<h4 style={{ fontWeight: "normal" }}>Enter your DOB</h4>
											<input
												type="date"
												className="date_entry"
												key={6}
												ref={signupDobInput}
												defaultValue={signupDobText}
												tabIndex="0"
											/>
										</div>
									</form>
								</div>
							</CSSTransition>
						</div>
					</div>

					<div className="btn_link_container">
						<button
							className="next_step_btn"
							onClick={() => handlePrimaryBtnClick(readAllUsernames)}
							ref={primaryBtn}
						>
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
