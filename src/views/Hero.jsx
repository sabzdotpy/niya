import { useState, useEffect } from "react";
import "../styles/Hero.scss";
import avatarHi from "../assets/hi_pure.png";
import ImageRenderer from "../components/ImageRenderer";

export default function Hero() {
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	//! ----------------  REF  ----------------

	//! ---------------- EFFECTS ----------------

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
	}, []);

	//! -----------------------------------------

	return (
		<div className="Hero">
			<section className="hi">
				<div className="welcomeTextContainer">
					<h1 className="welcomeText">
						{"Hi! I'm \n "}
						<span
							className="niyaLabel dottedUnderline"
							aria-label="An Irish variant of the name Nia, meaning 'aim', 'purpose', and 'beauty'."
						>
							Niya.
						</span>
					</h1>
					<span className="subText">Your personal healthcare assistant (and friend!)</span>
				</div>

				<div className="avatarWrapper">
					{/* <img src={avatarHi} alt="image of niya saying hi" /> */}
					<ImageRenderer url={avatarHi} width={450} height={500} />
				</div>
			</section>
			<section className="about">
				About Niya

				Niya is a ho
			</section>
			<section className="try">Try</section>
			<section className="login">Let's get started.</section>
		</div>
	);
}
