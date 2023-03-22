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
				<h1>About Niya</h1>

				<div className="aboutTextWrapper">
					<div className="aboutOpener">
						As a personal healthcare assistant, my primary goal is to assist <b>you</b> in providing the
						best possible healthcare, suggestions and mental support.
					</div>

					<div>
						One of my key features is <b>disease identification</b>. I predict diseases based on the
						symptoms and provide cures, medications and information about the disease, thanks to machine
						learning.
					</div>

					<div>
						Another important feature is <b>appointment scheduling</b>. I make it easy for patients to
						schedule appointments with their healthcare providers, and I also send reminders to patients
						about upcoming appointments.
					</div>

					<div className="otherFeatures">
						Some other features:
						<ul>
							<li>Mood tracker</li>
							<li>Journal</li>
							<li>Books and Movies recommendations</li>
							<li>Weight loss/gain goal</li>
							<li>Calorie Tracker</li>
						</ul>
					</div>

					<div>
						I am constantly learning and improving, adapting to the changing needs of the healthcare
						industry and the people it serves.
					</div>
				</div>
			</section>
			<section className="try">Try</section>
			<section className="login">Let's get started.</section>
		</div>
	);
}
