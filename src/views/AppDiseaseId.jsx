import "../styles/AppDiseaseId.scss";
import ImageRenderer from "../components/ImageRenderer";
import avatarHmm from "../assets/hmmm.png";
import useArray from "../hooks/useArray";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const BASE_URL = "http://localhost:5000";

const URL = (relative_url) => {
	return `${BASE_URL}${relative_url}`;
};

export default function AppDiseaseId() {
	const allSyms = useArray();
	const relatedSyms = useArray();
	const selectedRelatedSyms = useArray();

	const [mainSymptom, setMainSymptom] = useState();
	const [currentPanel, setCurrentPanel] = useState(1);
	const [predictedDisease, setPredictedDisease] = useState("");

	const mainSymptomInput = useRef();

	useEffect(() => {
		fetch(URL("/get_all_syms")).then((res) =>
			res.json().then((data) => {
				// console.log(data);
				allSyms.setValue(data);
				allSyms.remove("prognosis");
			})
		);
	}, []);

	const fetchAllSymptoms = () => {
		fetch(URL("/get_all_syms")).then((res) =>
			res.json().then((data) => {
				console.log(data);
				// allSyms.setValue(data);
			})
		);
		// axi.get("/get_all_syms")
		// .then((res) => {
		// 	console.log(res.data)
		// })
		// .catch((e) => {
		// 	console.warn(e)
		// })
	};

	const fetchRelatedSymptoms = (symptom) => {
		fetch(URL(`/get_related_syms?s=${symptom}`)).then((res) =>
			res.json().then((data) => {
				console.log(`Related Symptoms to ${symptom}`);
				if (data.indexOf(symptom) >= 0) {
					delete data[data.indexOf(symptom)];
				}
				console.log(data);
				relatedSyms.setValue(data);
			})
		);
	};

	const predictDisease = async (listOfSymptoms) => {
		listOfSymptoms.push(mainSymptom);
		console.log("Symptoms: ");
		console.log(listOfSymptoms);
		if (listOfSymptoms.length <= 0) {
			console.warn("Symptoms length is zero. Provide atleast one symptom.");
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
							setPredictedDisease(data[0]);
						})
						.catch((e) => {
							console.log("Error while converting to JSON");
							console.warn(e);
						});
				} else {
					console.warn("Server didn't sent 200");
					console.log(res);
				}
			})
			.catch((e) => {
				console.warn(e);
			});
	};

	return (
		<div className="appDiseaseId">
			<section className="topBanner">
				<button
					className="fetch"
					onClick={() => {
						predictDisease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"]);
						setCurrentPanel(3);
					}}
				>
					Test Predict
				</button>
			</section>

			<div className="sectionsWrapper">
				{/* <div className="avatarContainer">
					<ImageRenderer src={avatarHmm} height={300} width={300} />
				</div> */}

				<section className={"panel panel1 mainSymptomInputs" + (currentPanel === 1 ? " show" : "")}>
					Please enter the main symptom you are experiencing
					<div className="inputAndSymptomsWrapper">
						<div className="inputWrapper">
							<input type="text" ref={mainSymptomInput} />
							<button
								onClick={() => {
									mainSymptomInput.current.value = "x";
								}}
							>
								Clear
							</button>
						</div>

						<div className="allSymptomsContainer">
							{allSyms.value.map((symptom, index) => {
								return (
									<span
										className={
											"symptom" +
											(mainSymptomInput.current.value
												? symptom.replaceAll("_", " ").includes(mainSymptomInput.current.value)
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
										{index + 1} - {symptom.replaceAll("_", " ")}{" "}
									</span>
								);
							})}
						</div>
					</div>
					{/* <button onClick={() => {}}>Proceed</button> */}
				</section>

				<section className={"panel panel2 relatedSymptomInput" + (currentPanel === 2 ? " show" : "")}>
					Based on the main symptom {mainSymptom?.replaceAll("_", " ")}, I have a list of other possible
					symptoms that you may be experiencing, please select all that apply.
					<input type="text" />
					<div className="inputAndSymptomsWrapper">
						<div className="inputWrapper">
							<input type="text" ref={mainSymptomInput} />
							<button>Clear</button>
						</div>
						<div className="allSymptomsContainer">
							{relatedSyms.value.map((symptom, index) => {
								return (
									<span
										className="symptom"
										key={index}
										onClick={(e) => {
											if (selectedRelatedSyms.value.includes(symptom)) {
												console.log(`Removing ${symptom}`);
												e.target.classList.remove("selected");
												selectedRelatedSyms.remove(symptom);
											} else {
												console.log(`Adding ${symptom}`);
												e.target.classList.add("selected");
												selectedRelatedSyms.push(symptom);
											}
										}}
									>
										{index + 1} - {symptom.replaceAll("_", " ")}{" "}
									</span>
								);
							})}
						</div>
					</div>
					<button
						onClick={() => {
							predictDisease(selectedRelatedSyms.value);
							setCurrentPanel(3);
						}}
					>
						Proceed
					</button>
				</section>

				<section className={"panel panel3 relatedSymptomInput" + (currentPanel === 3 ? " show" : "")}>
					Based on the all the symptoms you have given me, I think you have
					<h2>{predictedDisease}</h2>
				</section>
			</div>

			<footer className="disclaimer">
				This tool does not provide medical advice It is intended for informational purposes only. It is not a
				substitute for professional medical advice, diagnosis or treatment. Never ignore professional medical
				advice in seeking treatment because of something you have read on the WebMD Site. If you think you may
				have a medical emergency, immediately call your doctor.
			</footer>
		</div>
	);
}
