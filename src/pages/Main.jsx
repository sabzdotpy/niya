import { Outlet } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/Notifications.scss";

import useArray from "../hooks/useArray";
import SignInPrompt from "../components/SignInPrompt";

import { useState, useRef, useEffect } from "react";

export default function Main() {
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	const [showLogin, setShowLogin] = useState();
	const notifications = useArray([
		{ title: "Hi", message: "Welcome to the site!" },
		{ title: "This site is still under construction", message: "If you find any flaws, please inform github.com/sabzdotpy"},
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

		window.addEventListener("scroll", () => {
			navBlurCheck();
		});

		return () => {
			// return a cleanup function to unregister our function since it's going to run multiple times
			window.removeEventListener("scroll", (e) => console.log("unregistering main scroll listener"));
		};
	}, []);

	//! -----------------------------------------

	const navBlurCheck = () => {
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

	return (
		<div className="Main" ref={mainPage}>
			<SignInPrompt noprompt in={showLogin} closeOverlay={() => setShowLogin(false)} header={"Login"} />
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
						<ul className="nav no-search" ref={navUl}>
							<li className="nav-item">
								<a href="#">About</a>
							</li>
							<li className="nav-item">
								<a href="#">Features</a>
							</li>
							<li className="nav-item">
								{/* <a href="#">Sign In</a> */}
								<button className="mainBtn" onClick={() => setShowLogin(true)}>
									Sign In
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<div className="notifications container">
				<div className="notifications list">
					{notifications.value.map((notif, index) => {
						return (
							<div
								className="notice notif important"
								onClick={() => {
									notifications.remove(index);
								}}
							>
								<span className="icon">!!</span>
								<span className="message">
									<span className="title">{notif.title}</span>
									{notif.message}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<section>
				<Outlet context={[setShowLogin]} />
			</section>
		</div>
	);
}
