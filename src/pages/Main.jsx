import "../styles/Navbar.css";
import "../styles/Notifications.scss";

import niya from "../assets/niya.png";

import useArray from "../hooks/useArray";
import SignInPrompt from "../components/SignInPrompt";
import { pink } from "../scripts/Misc";
import { useAuth } from "../contexts/AuthContext";

import { useState, useRef, useEffect } from "react";

import { MdOutlineApps } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FiSearch, FiSmile, FiX } from "react-icons/fi";
import { FaInfo, FaCheck } from "react-icons/fa"
import { GrTableAdd } from "react-icons/gr";
import { BsJournalRichtext, BsQuestionLg } from "react-icons/bs";
import { BiBrain } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai"
import { TiMessageTyping } from "react-icons/ti";


import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function Main() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	const [showLogin, setShowLogin] = useState();
	const [appsDrawerOpen, setAppsDrawerOpen] = useState(false);
	const notifications = useArray([
		// { title: "Hi", message: "Welcome to the site!", type: "info" },
		// {
		// 	title: "This site is still under construction",
		// 	message: "If you find any flaws, please inform github.com/sabzdotpy",
		// 	type: "info",
		// },
	]);

	const apps = useArray([
		{ name: "Disease Identification", icon: <FiSearch size={"25px"} />, route: "/app-ide" },
		{ name: "Book Appointments", icon: <GrTableAdd size={"25px"} />, route: "/app-app" },
		{ name: "Diary", icon: <BsJournalRichtext size={"25px"} />, route: "/app-jou" },
		{ name: "Mood Tracker", icon: <FiSmile size={"25px"} />, route: "/app-moo" },
		{ name: "Chat", icon: <TiMessageTyping size={"25px"} />, route: "/chat" },
		{ name: "Recommendations", icon: <BiBrain size={"25px"} />, route: "/app-reco" },
		{ name: "Calorie Tracker", icon: <AiOutlineFire size={"25px"} />, route: "/app-calo" },
	]);

	//! ----------------  REF  ----------------

	const navUl = useRef();
	const navBar = useRef();
	const mobileNavToggler = useRef();
	const mainPage = useRef();

	//! ---------------- EFFECTS ----------------

	useEffect(() => {
		console.log("Main.jsx useEffect..");
		console.log(notifications.value);

		navBlurCheck();
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});

		console.log("adding scroll listener");
		// document.querySelector(".out").addEventListener("scroll", (se) => {
		// 	console.log("Main scrolled.")
		// })
		window.addEventListener("scroll", () => {
			navBlurCheck();
		});

		return () => {
			// return a cleanup function to unregister our function since it's going to run multiple times
			window.removeEventListener("scroll", (e) => console.log("unregistering main scroll listener"));
			window.removeEventListener("resize", () => console.log("unregistering resize listener"))
		};
	}, []);

	useEffect(() => {
		console.log("Notifications changed.");
		pink(notifications.value.length);
		if (notifications.value.length) {
			setTimeout(() => {
				notifications.remove(notifications.value.length - 1);
			}, 5000);
		}
	}, [notifications.value]);

	//! -----------------------------------------

	const navBlurCheck = () => {
		// console.log("checking scroll");
		if (window.scrollY) {
			navBar?.current?.classList.remove("noeff");
		} else {
			navBar?.current?.classList.add("noeff");
		}
	};

	const mobileNavToggle = () => {
		navUl.current.classList.toggle("mobile-nav");
		mobileNavToggler.current.classList.toggle("is-active");
	};

	const pushToNotifications = (title, message, type) => {
		notifications.push({ title: title, message: message, type: type });
	};

	return (
		<div className="Main" ref={mainPage}>
			<SignInPrompt
				noprompt
				in={showLogin}
				closeOverlay={() => setShowLogin(false)}
				header={"Login"}
				pushToNotifications={pushToNotifications}
			/>
			<header>
				<div className="nav-wrapper">
					{/* <div className="grad-bar"></div> */}
					<nav className={"navbar" + " noeff"} ref={navBar}>
						<img
							src={niya}
							alt="Niya Logo"
							title="Go back to main page"
							onClick={() => navigate("/")}
						></img>
						{/* <div className="menu-toggle" id="mobile-menu" ref={mobileNavToggler} onClick={mobileNavToggle}>
							<span className="bar"></span>
							<span className="bar"></span>
							<span className="bar"></span>
						</div> */}
						<div className={"nav-items-container " + location.pathname}>
							<ul
								className={
									"nav no-search" + (currentUser === "none" || !currentUser ? "" : " signed-in")
								}
								ref={navUl}
							>
								{location.pathname !== "/hero" ? (
									<li className="nav-item">
										<div
											className="apps-icon"
											tabIndex={"0"}
											onBlur={() => setAppsDrawerOpen(false)}
										>
											<MdOutlineApps
												size={"30px"}
												onClick={() => setAppsDrawerOpen(!appsDrawerOpen)}
											/>
											<CSSTransition
												in={appsDrawerOpen}
												timeout={300}
												classNames="appsanim"
												unmountOnExit
											>
												<ul className={"apps-dropdown"}>
													{apps.value.map((app, index) => {
														return (
															<li
																key={index}
																className="item"
																onClick={() => navigate(app.route)}
															>
																<span className="icon">
																	{app.icon}
																</span>
																<span className="name">
																	{app.name}
																</span>
															</li>
														);
													})}
												</ul>
											</CSSTransition>
										</div>
									</li>
								) : (
									<>
										<li className="nav-item">
											<a href="#about">About</a>
										</li>
										<li className="nav-item">
											<a href="#features">Features</a>
										</li>
									</>
								)}

								<li className="nav-item">
									{currentUser === "none" || !currentUser ? (
										<button className="mainBtn" onClick={() => setShowLogin(true)}>
											Sign In
										</button>
									) : (
										<div className="account-icon" onClick={() => navigate("/account")}>
											<VscAccount size={"30px"} />
										</div>
									)}
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</header>

			<div className="notifications container">
				<div className="notifications list">
					{notifications.value.map((notif, index) => {
						return (
							<div
								className={"notice notif important " + notif.type}
								key={index}
								onClick={() => {
									notifications.remove(index);
								}}
							>
								<span className="icon">
									{notif.type === "info"
										? <FaInfo />
										: notif.type === "error"
										? <FiX />
										: notif.type === "success"
										? <FaCheck />
										: <BsQuestionLg />}
								</span>
								<span className="message">
									<span className="title">{notif.title}</span>
									{notif.message}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<section className="out">
				<Outlet context={ [setShowLogin, pushToNotifications] } />
			</section>
		</div>
	);
}
