import "../styles/AppDiseaseId.scss";
import ImageRenderer from "../components/ImageRenderer";
import avatarHmm from "../assets/hmmm.png";
import useArray from "../hooks/useArray";
import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { backend_url as BASE_URL } from "../components/BackUrl";

import { pink, toTitleCase } from "../scripts/Misc";
import LoadingScreen from "../components/LoadingScreen";

import axios from "../scripts/axios";
import { set } from "firebase/database";

const URL = (relative_url) => {
	return `${BASE_URL}${relative_url}`;
};

export default function AppDiseaseId() {
	const [setShowLogin, pushToNotifications] = useOutletContext();

	const [showLoading, setShowLoading] = useState(true);

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
		fetchAllSymptoms();
		mainSymptomPanel.current.classList.remove("loading");
		mainSymptomPanel.current.classList.add("doneLoading");
	}, []);

	const fetchAllSymptoms = async () => {
		try {
			setShowLoading(true);
			let res = await axios.get("/diagnosis/get_all_syms");
			allSyms.setValue(res.data);
			allSyms.remove("prognosis");
			setShowLoading(false);
		}
		catch (err) {
			console.warn(err);
			setShowLoading(false);
			pushToNotifications(
				"Server down",
				"The server is not responding to your request. Please inform the creator.",
				"error"
			);
		}
	}

	const fetchRelatedSymptoms = async (symptom) => {
		relatedSymptomPanel.current.classList.add("loading");
		setShowLoading(true);
		let res = await axios.get(`/diagnosis/get_related_syms?s=${symptom}`)
		if (res.data?.join("") === "invalid sym") {
			setCurrentPanel(1);
			pushToNotifications("Error", "Invalid Symptom, please try again.", "error");
			setShowLoading(false);
			return;
		}
		let data = res.data.filter((sym) => sym !== symptom);
		relatedSyms.setValue(data	);
		relatedSyms.remove(symptom);
		setShowLoading(false);
		relatedSymptomPanel.current.classList.remove("loading");
		relatedSymptomPanel.current.classList.add("doneLoading");
	};

	const predictDisease = async (listOfSymptoms) => {
		try {
			predictionPanel.current.classList.add("loading");
			listOfSymptoms.push(mainSymptom);
			console.log("Symptoms: ");
			console.log(listOfSymptoms);
			if (listOfSymptoms.length <= 0) {
				pushToNotifications("Error", "Please provide atleast one symptom.", "error");
				return;
			}

			let res = await axios.post(
				`/diagnosis/predict/`,
				{
					symptoms: listOfSymptoms,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			if (res.data[0] === res.data[1]) {
				// both predictions are same
				setPredictedDisease(toTitleCase(res.data[0].replaceAll("_", " ")));
				getPrecautions(res.data[0]);
			} else {
				setPredictedDisease(
					`${toTitleCase(res.data[0].replaceAll("_", " "))} or ${toTitleCase(
						res.data[1].replaceAll("_", " ")
					)}`
				);
				getPrecautions(res.data);
			}
			predictionPanel.current.classList.remove("loading");
			predictionPanel.current.classList.add("doneLoading");
		} catch (err) {
			console.warn(err);
			pushToNotifications(
				"Server down",
				"The server is not responding to your request. Please inform the creator.",
				"error"
			);
			predictionPanel.current.classList.remove("loading");
			setShowLoading(false);
		}
	};

	const getPrecautions = async (listOfDiseases) => {
		try {
			if (typeof listOfDiseases === "string") {
				listOfDiseases = [listOfDiseases];
			}

			let res = await axios.post(`diagnosis/get_prec/`,
				{ diseases: listOfDiseases },
				{ headers: { "Content-Type": "application/json" } }
			);
			precautionsList.setValue(res.data.precautions);
		} catch (err) {
			console.warn(err);
			pushToNotifications(
				"Server down",
				"The server is not responding to your request. Please inform the creator.",
				"error"
			);
		}
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
								<LoadingScreen className="panel" in={true && showLoading} unmountOnExit transparent noprompt />
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
								<LoadingScreen in={true && showLoading} unmountOnExit transparent noprompt />
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
						{(precautionsList.value) ? (
							precautionsList.value.map((precaution, index) => {
								return <li key={index}>{toTitleCase(precaution)}</li>;
							})
						) : (
							<LoadingScreen in={true && showLoading} unmountOnExit transparent noprompt />
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
