import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import "../styles/LoadingScreen.scss";
import { CSSTransition } from "react-transition-group";

/*
PROPS:
    - notext = show no text
    - customText = show a custom message instead of good morning/afternoon/evening.
    - showPun = shows pun if set to true. pun visibility is not affected by notext prop or customText prop.

    - in = base in condition. shows loader if in is true.
    - unmountOnExit = optional param. if set to true loading screen will be removed from the dom if in condition is falsy.

    - transparent = sets background color as transparent if true. useful when wanting to show just a loading icon.
    - noprompt = removes the brighter square that houses all the text and loader if set to true.
    - z = optional prop that sets a custom zIndex instead of the default 101.
*/
function LoadingScreen(props) {
	const [textToShow, setTextToShow] = useState();
	const [pun, setPun] = useState(null);


	return (
		<CSSTransition in={props.in} timeout={250} classNames={"loadinganim"} unmountOnExit={props.unmountOnExit}>
			<div
				className="loader"
				style={{ backgroundColor: (props.transparent) ? "transparent !important" : "red", zIndex: props.z || 101 }}
			>
				{props.noprompt ? <AiOutlineLoading3Quarters className="loading_icon" size={"50px"} /> : null}
			</div>
		</CSSTransition>
	);
}

export default LoadingScreen;
