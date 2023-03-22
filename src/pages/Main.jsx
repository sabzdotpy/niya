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
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
		window.addEventListener("scroll", () => {
			console.log(navBar.current.scrollTop)
		}, false)
	}, []);

	//! -----------------------------------------

	const mobileNavToggle = () => {
		navUl.current.classList.toggle("mobile-nav");
		mobileNavToggler.current.classList.toggle("is-active");
	};

	return (
		<div className="Main" >
			<header>
				<div class="nav-wrapper">
					{/* <div class="grad-bar"></div> */}
					<nav class={"navbar" + " noeff"} ref={navBar} >
						<img
							src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
							alt="Company Logo"
						></img>
						<div class="menu-toggle" id="mobile-menu" ref={mobileNavToggler} onClick={mobileNavToggle}>
							<span class="bar"></span>
							<span class="bar"></span>
							<span class="bar"></span>
						</div>
						<ul class="nav no-search" ref={navUl}>
							<li class="nav-item">
								<a href="#">About</a>
							</li>
							<li class="nav-item">
								<a href="#">Features</a>
							</li>
							<li class="nav-item">
								{/* <a href="#">Sign In</a> */}
								<button className="mainBtn">Sign In</button>
								
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<section>
				<Outlet/>
			</section>
		</div>
	);
}