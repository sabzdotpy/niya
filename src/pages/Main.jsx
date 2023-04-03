import { Outlet } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/Notifications.scss";

import useArray from "../hooks/useArray";
import SignInPrompt from "../components/SignInPrompt";
import { pink } from "../scripts/Misc";
import { useAuth } from "../contexts/AuthContext";

import { useState, useRef, useEffect } from "react";
import { MdOutlineApps } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

export default function Main() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	const [showLogin, setShowLogin] = useState();
	const notifications = useArray([
		{ title: "Hi", message: "Welcome to the site!", type: "info" },
		{
			title: "This site is still under construction",
			message: "If you find any flaws, please inform github.com/sabzdotpy",
			type: "info",
		},
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

		console.log("adding scroll listener")
		window.addEventListener("scroll", () => {
			navBlurCheck();
		});

		return () => {
			// return a cleanup function to unregister our function since it's going to run multiple times
			window.removeEventListener("scroll", (e) => console.log("unregistering main scroll listener"));
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
		console.log("checking scroll")
		if (window.scrollY) {
			navBar.current.classList.remove("noeff");
		} else {
			navBar.current.classList.add("noeff");
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
							src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
							alt="Company Logo"
						></img>
						<div className="menu-toggle" id="mobile-menu" ref={mobileNavToggler} onClick={mobileNavToggle}>
							<span className="bar"></span>
							<span className="bar"></span>
							<span className="bar"></span>
						</div>
						<div className={"nav-items-container " + (location.pathname)}>
							<ul
								className={
									"nav no-search" + (currentUser === "none" || !currentUser ? "" : " signed-in")
								}
								ref={navUl}
							>
								{location.pathname === "/" ? (
									<li className="nav-item">
										<div className="apps-icon">
											<MdOutlineApps size={"30px"} />
										</div>
									</li>
								) :
									<>
										<li className="nav-item">
											<a href="#">About</a>
										</li>
										<li className="nav-item">
											<a href="#">Features</a>
										</li>
									</>
								}

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
								className="notice notif important"
								key={index}
								onClick={() => {
									notifications.remove(index);
								}}
							>
								<span className="icon">
									{notif.type === "info"
										? "!"
										: notif.type === "error"
										? "X"
										: notif.type === "success"
										? ":)"
										: "!!"}
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
				<Outlet context={[setShowLogin]} />
			</section>
		</div>
	);
}
