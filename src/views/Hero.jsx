import { useState, useEffect } from "react";
import "../styles/Hero.scss";
import avatarHi from "../assets/hi_pure.png";
import avatarAbout from "../assets/smiling_eye_closed.png";
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
							className="niyaLabel dottedUnderline popup"
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

				<div className="aboutText">
					<div className="aboutTextWrapper">
						<div className="aboutOpener">
							As a peronal healthcare assistant my goal is to assist <b>you</b> in providing the
							best possible healthcare suggestions and mental health.
						</div>
						<div className="aboutOpener mobile">
							I aim to assist <b>you</b> in providing the best healthcare suggestions.
						</div>

						<div>I'm built using React, SCSS, Vite, Firebase and various other technologies.</div>
						<div>
							To predict diseases, I also use Python's Scikit Learning, Scipy, Matplotlib and Google Cloud
							Functions.
						</div>
						<div>
							I'm created by <b className="popup dottedUnderline" aria-label="Sabari, Naveen Samraj, Yaswanth">Team Zeta</b> for the <strong>Solving For India</strong> Hackathon by GeeksForGeeks.
						</div>
					</div>

					<div className="aboutImageWrapper">
						<ImageRenderer url={avatarAbout} width={450} height={500} />
					</div>
				</div>

				{/* <div className="aboutTextWrapper">
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
				</div> */}
			</section>
			<section className="try">Try</section>
			<section className="login">Let's get started.</section>
		</div>
	);
}
