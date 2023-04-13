import { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import "../styles/Hero.scss";

import avatarHi from "../assets/hi_pure.png";
import avatarAbout from "../assets/smiling_eye_closed.png";

import ImageRenderer from "../components/ImageRenderer";
import SectionDivider from "../components/SectionDivider";
import { useAuth } from "../contexts/AuthContext";
import ScrollContainer from "../components/ScrollContainer";
// import InfoDiv from "../components/InfoDiv";

export default function Hero(props) {
	//! ----------------  STATE  ----------------
	const [windowWidth, setWindowWidth] = useState();
	const { author, currentUser } = useAuth();
	const [setShowLogin] = useOutletContext();
	const navigate = useNavigate();
	//! ----------------  REF  ----------------
	const infodiv = useRef();
	//! ---------------- EFFECTS ----------------

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
		// console.log(props);
	}, []);

	//! -----------------------------------------

	const showInfoDiv = (text, color, timeout) => {
		infodiv.current.show();
	};

	return (
		<ScrollContainer>
			<div className="Hero">
				{/* <InfoDiv ref={infodiv} /> */}
				<section className="hi">
					<div className="welcomeTextContainer">
						<h1 className="welcomeText">
							{"Hi! I'm \n "}
							<span
								className="niyaLabel dottedUnderline popup noMobileTapHighlight"
								aria-label="An Irish variant of the name Nia, meaning 'aim', 'purpose', and 'beauty'."
							>
								Niya.
							</span>
						</h1>
						<span className="subText">Your personal healthcare assistant (and friend!)</span>
					</div>

					<div className="avatarWrapper">
						{/* <img src={avatarHi} alt="image of niya saying hi" /> */}
						<ImageRenderer url={avatarHi} width={330} height={500} />
					</div>
				</section>
				<section className="about">
					<a name="about"></a>
					<SectionDivider />
					<h1>About Niya</h1>

					<div className="aboutText">
						<div className="aboutTextWrapper">
							<div className="aboutOpener">
								As a peronal healthcare assistant my goal is to assist <b>you</b> in providing the best
								possible healthcare suggestions and mental health.
							</div>

							<div>I'm built using React, SCSS, Vite, Firebase and various other technologies.</div>
							<div className="machineLearningInfo">
								To predict diseases, I also use Python's Scikit Learning, Scipy, Matplotlib and Google
								Cloud Functions.
							</div>
							<div>
								I'm created by{" "}
								<b
									className="popup dottedUnderline noMobileTapHighlight"
									aria-label="Sabari, Naveen, Sanjay"
								>
									Team Zeta
								</b>{" "}
								for the <strong>Solving For India</strong> Hackathon by GeeksForGeeks.
							</div>
						</div>

						<div className="aboutImageWrapper">
							<ImageRenderer url={avatarAbout} width={"330px"} height={"330px"} />
						</div>
					</div>
				</section>
				<section className="try">
					<a name="features"></a>
					<SectionDivider />
					<div className="tryWrapper">
						<h1>Features</h1>

						{/* <div className="tryTextWrapperMobile">
						<div>
							I <b>identify diseases</b> based on symptoms using machine learning, and{" "}
							<b>schedule appointments</b> with healthcare providers.
						</div>
						<div className="otherFeatures">
							Along with that, I also have many other features such as,
							<ul className="featuresWrapper">
								<li className="popup" aria-label="Track your moods everyday and (..)">
									Mood tracker
								</li>
								<li>Journal</li>
								<li>Books and Movies recommendations</li>
								<li>Weight loss/gain goal</li>
								<li>Calorie Tracker</li>
								<li>And more...</li>
							</ul>
						</div>
					</div> */}

						<div className="tryTextWrapper">
							<div>
								One of my key features is <b>disease identification</b>. I predict diseases based on the
								symptoms and provide cures, medications and information about the disease, thanks to
								machine learning.
							</div>

							<div>
								Another important feature is <b>appointment scheduling</b>. I make it easy for patients
								to schedule appointments with their healthcare providers, and I also send reminders to
								patients about upcoming appointments.
							</div>

							<div className="otherFeatures">
								{/* Some other features: */}
								<ul className="featuresWrapper">
									<li className="popup" aria-label="Track your moods everyday and (...)">
										Mood tracker
									</li>
									<li>Journal</li>
									<li>Books and Movies recommendations</li>
									<li>Weight loss/gain goal</li>
									<li>Calorie Tracker</li>
									<li>And more...</li>
								</ul>
							</div>

							<div>
								I am constantly learning and improving, adapting to the changing needs of the healthcare
								industry and the people it serves.
							</div>
						</div>
					</div>
				</section>
				<section className="login">
					<SectionDivider />
					<div className="loginWrapper">
						What are you waiting for? An all-in-one healthcare assistant is just a click away!
						<button className="doubleBtn" onClick={() => (currentUser === "none") ? setShowLogin(true) : navigate("/") }>
							{currentUser === "none" ? "Create an account" : "Go to Main Page"}
						</button>
					</div>
				</section>
			</div>
		</ScrollContainer>
	);
}
