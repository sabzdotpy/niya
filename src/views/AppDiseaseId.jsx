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
	const [currentPanel, setCurrentPanel] = useState(1);
	const [predicredDisease, setPredictedDisease] = useState("");

	const mainSymptomInput = useRef();

	useEffect(() => {
		fetch(URL("/get_all_syms")).then((res) =>
			res.json().then((data) => {
				// console.log(data);
				allSyms.setValue(data);
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
				// console.log(data);
				relatedSyms.setValue(data);
			})
		);
	};

	const predictDisease = async (listOfSymptoms) => {
		fetch(URL(`/predict`), {
			method: "post",
			headers: { "Content-Type": "application/json, application/x-www-form-urlencoded" },
			body: JSON.stringify(listOfSymptoms),
		}).then((res) =>
			res.json().then((data) => {
				console.log(data);
				setPredictedDisease(data[0])
			})
		);
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

			<section className={"panel panel1 mainSymptomInputs" + (currentPanel === 1 ? " show" : "")}>
				Please enter the main symptom you are experiencing
				<input type="text" ref={mainSymptomInput} />
				<ul>
					{allSyms.value.map((symptom, index) => {
						return (
							<li key={index}>
								{" "}
								{index + 1} - {symptom}{" "}
							</li>
						);
					})}
				</ul>
				<button
					onClick={() => {
						fetchRelatedSymptoms(mainSymptomInput.current.value.replaceAll(" ", "_"));
						setCurrentPanel(2);
					}}
				>
					Proceed
				</button>
			</section>

			<section className={"panel panel2 relatedSymptomInput" + (currentPanel === 2 ? " show" : "")}>
				Based on the main symptom you gave, I have a list of other possible symptoms that you may be
				experiencing, please select all that apply.
				<input type="text" />
				<ul>
					{relatedSyms.value.map((symptom, index) => {
						return (
							<li key={index}>
								{" "}
								{index + 1} - {symptom}{" "}
							</li>
						);
					})}
				</ul>
				<button
					onClick={() => {
						predictDisease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"]);
						setCurrentPanel(3);
					}}
				>
					Proceed
				</button>
			</section>

			<section className={"panel panel3 relatedSymptomInput" + (currentPanel === 3 ? " show" : "")}>
				Based on the all the symptoms you have given me, I think you have
				<h2>{predicredDisease}</h2>
			</section>

			<footer className="disclaimer">
				This tool does not provide medical advice It is intended for informational purposes only. It is not a
				substitute for professional medical advice, diagnosis or treatment. Never ignore professional medical
				advice in seeking treatment because of something you have read on the WebMD Site. If you think you may
				have a medical emergency, immediately call your doctor.
			</footer>
		</div>
	);
}
