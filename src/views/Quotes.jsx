import { useEffect, useRef, useState } from "react";
import "../styles/Quotes.scss";
import { BsDice5Fill } from "react-icons/bs";
import MovingBlob from "../assets/blob.svg";

export default function Quotes() {
	const quoteDiv = useRef();
	const newQuoteBtn = useRef();
	const [quote, setQuote] = useState();

	const getNewQuote = () => {
		console.log("Getting new quote")
		newQuoteBtn.current.classList.add("play");
		newQuoteBtn.current.setAttribute("disabled", "disabled");
		fetch("https://api.quotable.io/random?tags=motivational&maxLength=265")
			.then((res) => {
				res.json()
					.then((data) => {
						setQuote(data);
						newQuoteBtn.current.removeAttribute("disabled");
						newQuoteBtn.current.classList.remove("play");
					})
					.catch((err) => {
						setQuote({ content: "Something went wrong :(", author: "Niya" });
						newQuoteBtn.current.removeAttribute("disabled");
						newQuoteBtn.current.classList.remove("play");
					});
			})
			.catch((err) => {
				console.log("No response");
				setQuote({ content: "Something went wrong :(", author: "Niya" });
				newQuoteBtn.current.removeAttribute("disabled");
				newQuoteBtn.current.classList.remove("play");
			});
	};

	useEffect(() => {
		getNewQuote();
	}, []);

	return (
		<div className="Quotes">
			<img src={MovingBlob} className="blob" />

			<div className="quoteDiv" ref={quoteDiv}>
				<div className="quote">{quote?.content}</div>
				<span className="author">- {quote?.author}</span>
			</div>
			<button className="getNewQuote noMobileTapHighlight" ref={newQuoteBtn} onClick={getNewQuote}>
				<BsDice5Fill size={"30px"} />
			</button>
		</div>
	);
}
