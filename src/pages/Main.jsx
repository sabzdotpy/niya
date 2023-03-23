import { Outlet } from "react-router-dom";
import "../styles/Navbar.css";

import { useState, useRef, useEffect } from "react";

export default function Main() {
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	//! ----------------  REF  ----------------

	const navUl = useRef();
	const navBar = useRef();
	const mobileNavToggler = useRef();
	const mainPage = useRef();

	//! ---------------- EFFECTS ----------------

	useEffect(() => {
		console.log("Main.jsx useEffect..");
		
		navBlurCheck();

		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});

		window.addEventListener("scroll", () => {
			navBlurCheck()
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
	}

	const mobileNavToggle = () => {
		navUl.current.classList.toggle("mobile-nav");
		mobileNavToggler.current.classList.toggle("is-active");
	};

	return (
		<div className="Main" ref={mainPage}>
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
								<button className="mainBtn">Sign In</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<section>
				<Outlet />
			</section>
		</div>
	);
}
