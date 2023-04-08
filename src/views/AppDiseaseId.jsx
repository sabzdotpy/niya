import "../styles/AppDiseaseId.scss";
import ImageRenderer from "../components/ImageRenderer";
import avatarHmm from "../assets/hmmm.png";

export default function AppDiseaseId() {

    const fetchSymptoms = () => {
        fetch("/api/symptoms").then((res) => res.json().then((data) => {
            console.log(data)
        }))
    }
        
    

	return (
		<div className="appDiseaseId">
			<section className="topBanner">
                <button className="fetch" onClick={fetchSymptoms}>Fetch Symptoms</button>
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
