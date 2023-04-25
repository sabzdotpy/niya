import "../styles/AppDiseaseId.scss";
import ImageRenderer from "../components/ImageRenderer";
import avatarHmm from "../assets/hmmm.png";
import useArray from "../hooks/useArray";
import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { backend_url as BASE_URL } from "../components/BackUrl";

import { pink, toTitleCase } from "../scripts/Misc";


const URL = (relative_url) => {
	return `${BASE_URL}${relative_url}`;
};

export default function AppDiseaseId() {
	const [setShowLogin, pushToNotifications] = useOutletContext();

	const allSyms = useArray();
	const relatedSyms = useArray();
	const selectedRelatedSyms = useArray();
	const precautionsList = useArray();

	const [mainSymptom, setMainSymptom] = useState("");
	const [currentPanel, setCurrentPanel] = useState(1);
	const [predictedDisease, setPredictedDisease] = useState("");
	const [queryValue, setQueryValue] = useState("");
	const [relatedSymsQueryValue, setRelatedSymsQueryValue] = useState("");

	const mainSymptomInput = useRef();
	const mainSymptomPanel = useRef();
	const relatedSymptomPanel = useRef();
	const predictionPanel = useRef();

	useEffect(() => {
		mainSymptomPanel.current.classList.add("loading");
		// console.log(process.env.REACT_APP_BACKEND)
		fetch(URL("/get_all_syms"))
			.then((res) => {
				if (!res.ok) {
					pushToNotifications(
						"Server down",
						`Server responded with ${res.status}. Please inform the creator.`,
						"error"
					);
				} else {
					res.json()
						.then((data) => {
							allSyms.setValue(data);
							allSyms.remove("prognosis");
						})
						.catch((err) => {
							console.log("Error in converting all symptoms to json");
							console.warn(err);
						});
				}
			})
			.catch((err) => {
				console.log("No response");
				console.warn(err);
				pushToNotifications(
					"Server down",
					"The server is not responding to your request. Please inform the creator.",
					"error"
				);
			});
		mainSymptomPanel.current.classList.remove("loading");
		mainSymptomPanel.current.classList.add("doneLoading");
	}, []);

	const fetchRelatedSymptoms = (symptom) => {
		relatedSymptomPanel.current.classList.add("loading");
		fetch(URL(`/get_related_syms?s=${symptom}`))
			.then((res) =>
				res.json().then((data) => {
					console.log(`Related Symptoms to ${symptom}`);
					if (data.indexOf(symptom) >= 0) {
						delete data[data.indexOf(symptom)];
					}
					console.log(data);
					if (data.join("") !== "invalid sym") {
						relatedSyms.setValue(data);
					} else {
						setCurrentPanel(1);
					}
				})
			)
			.catch((err) => {
				console.log("Error in getting related symptoms");
				console.warn(err);
				pushToNotifications(
					"Server down",
					"The server is not responding to your request. Please inform the creator.",
					"error"
				);
			});
		relatedSymptomPanel.current.classList.remove("loading");
		relatedSymptomPanel.current.classList.add("doneLoading");
	};

	const predictDisease = async (listOfSymptoms) => {
		predictionPanel.current.classList.add("loading");
		listOfSymptoms.push(mainSymptom);
		console.log("Symptoms: ");
		console.log(listOfSymptoms);
		if (listOfSymptoms.length <= 0) {
			pushToNotifications("Error", "Please provide atleast one symptom.", "error");
			return;
		}

		fetch(URL(`/predict`), {
			method: "post",
			headers: { "Content-Type": "application/json, application/x-www-form-urlencoded" },
			body: JSON.stringify(listOfSymptoms),
		})
			.then((res) => {
				if (res.status === 200) {
					res.json()
						.then((data) => {
							console.log(data);
							if (data[0] === data[1]) {
								setPredictedDisease(data[0]);
								getPrecautions(data[0]);
							} else {
								setPredictedDisease(`${data[0]} or ${data[1]}`);
								getPrecautions(data);
							}
						})
						.catch((e) => {
							console.log("Error while converting predicted disease to JSON");
							console.warn(e);
						});
				} else {
					console.warn("Server didn't sent 200");
					pushToNotifications("Whoa", "Unknown error. I'm as clueless as you are :(", "error");
					console.log(res);
				}
			})
			.catch((e) => {
				console.warn(e);
				pushToNotifications(
					"Unknown Error",
					"The server is not responding to your request. Please inform the creator.",
					"error"
				);
			});
		predictionPanel.current.classList.remove("loading");
		predictionPanel.current.classList.add("doneLoading");
	};

	const getPrecautions = (listOfDiseases) => {
		fetch(URL(`/get_prec`), {
			method: "post",
			headers: { "Content-Type": "application/json, application/x-www-form-urlencoded" },
			body: JSON.stringify(listOfDiseases),
		})
			.then((res) => {
				if (res.status === 200) {
					res.json()
						.then((data) => {
							console.log(data[0]);

							precautionsList.push(data[0]);
							pink("Printing precs");
							// console.log(data)
							// if (data[0] === data[1]) {
							// 	setPrecautions(data[0]);
							// } else {
							// 	setPredictedDisease(`${data[0]} or ${data[1]}`);
							// }
						})
						.catch((e) => {
							console.log("Error while converting precautions to JSON");
							console.warn(e);
						});
				} else {
					console.warn("Server didn't sent 200");
					console.log(res);
				}
			})
			.catch((e) => {
				console.warn(e);
				pushToNotifications("The server is not responding to your request. Please inform the creator.");
			});
	};

	return (
		<div className="appDiseaseId">
			<section className="topBanner">
				{/* <button
					className="fetch"
					onClick={() => {
						predictDisease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"]);
						setCurrentPanel(3);
					}}
				>
					Test Predict
				</button> */}
				{/* Disease Identification */}
			</section>

			<div className="sectionsWrapper">
				{/* <div className="avatarContainer">
					<ImageRenderer src={avatarHmm} height={300} width={300} />
				</div> */}

				<section
					className={"panel panel1 mainSymptomInputs" + (currentPanel === 1 ? " show" : "")}
					ref={mainSymptomPanel}
				>
					Please enter the main symptom you are experiencing
					<div className="inputAndSymptomsWrapper">
						<div className="inputWrapper">
							<input
								type="text"
								placeholder="Search for symptoms..."
								value={queryValue}
								ref={mainSymptomInput}
								onChange={(e) => {
									setQueryValue(e.target.value);
								}}
							/>
							<button
								onClick={() => {
									setQueryValue("");
								}}
							>
								Clear
							</button>
						</div>

						<div className="allSymptomsContainer">
							{allSyms.value.length > 0 ? (
								allSyms.value.map((symptom, index) => {
									return (
										<span
											className={
												"symptom" +
												(queryValue
													? symptom.toLowerCase().replaceAll("_", " ").includes(queryValue)
														? ""
														: " hide"
													: "")
											}
											key={index}
											onClick={() => {
												setMainSymptom(symptom);
												console.log(`Main Symptom: ${symptom}`);
												fetchRelatedSymptoms(symptom);
												setCurrentPanel(2);
											}}
										>
											{toTitleCase(symptom.replaceAll("_", " "))}
										</span>
									);
								})
							) : (
								<div>Getting data..</div>
							)}
						</div>
					</div>
					{/* <button onClick={() => {}}>Proceed</button> */}
				</section>

				<section
					className={"panel panel2 relatedSymptomInput" + (currentPanel === 2 ? " show" : "")}
					ref={relatedSymptomPanel}
				>
					Based on the main symptom <b>{toTitleCase(mainSymptom?.replaceAll("_", " "))}</b>, I have a list of
					other possible symptoms that you may be experiencing, please select all that apply.
					<div className="inputAndSymptomsWrapper">
						<div className="inputWrapper">
							<input
								type="text"
								ref={mainSymptomInput}
								onChange={(e) => {
									setRelatedSymsQueryValue(e.target.value);
								}}
							/>
							<button>Clear</button>
						</div>
						<div className="allSymptomsContainer">
							{relatedSyms.value.length > 0 ? (
								relatedSyms.value.map((symptom, index) => {
									return (
										<span
											className={
												"symptom" +
												(relatedSymsQueryValue
													? symptom
															.toLowerCase()
															.replaceAll("_", " ")
															.includes(relatedSymsQueryValue)
														? ""
														: " hide"
													: "")
											}
											key={index}
											onClick={(e) => {
												// console.log("Clicked on a symptom");
												if (selectedRelatedSyms.value.includes(symptom)) {
													console.log(`Removing ${symptom}`);
													e.target.classList.remove("selected");
													selectedRelatedSyms.remove(
														selectedRelatedSyms.value.indexOf(symptom)
													);
												} else {
													console.log(`Adding ${symptom}`);
													e.target.classList.add("selected");
													selectedRelatedSyms.push(symptom);
												}
												console.log(selectedRelatedSyms.value);
											}}
										>
											{toTitleCase(symptom.replaceAll("_", " "))}
											<div className="overlay">
												<span>✓</span>
											</div>
										</span>
									);
								})
							) : (
								<div>Getting related symptoms...</div>
							)}
						</div>
					</div>
					<button
						className="predictButton"
						onClick={() => {
							predictDisease(selectedRelatedSyms.value);
							setCurrentPanel(3);
						}}
					>
						Proceed
					</button>
				</section>

				<section
					className={"panel panel3 predictionPanel" + (currentPanel === 3 ? " show" : "")}
					ref={predictionPanel}
				>
					<div className="header">
						<span>Based on the all the symptoms you have given me, I think you have</span>
						<h2>{predictedDisease}</h2>
					</div>

					<h4>These are some precautions you can take for a relief. It is advisable to consult a doctor.</h4>
					<ul className="precautionsContainer">
						{precautionsList.value[0] ? (
							precautionsList.value[0].map((precaution, index) => {
								return <li key={index}>{toTitleCase(precaution)}</li>;
							})
						) : (
							<li>Getting data...</li>
						)}
					</ul>
				</section>
			</div>

			<footer className="disclaimer">
				This tool does not provide medical advice. It is intended for informational purposes only. It is not a
				substitute for professional medical advice, diagnosis or treatment. Never ignore professional medical
				advice in seeking treatment. If you think you may have a medical emergency, immediately call your
				doctor.
			</footer>
		</div>
	);
}
