import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

import Hero from "./views/Hero";
import Home from "./views/Home";
import AppDiseaseId from "./views/AppDiseaseId";
import UnderConstruction from "./views/UnderConstruction";

function App() {
	const location = useLocation();

	return (
		<TransitionGroup component={null}>
			<CSSTransition key={location.key} classNames="fade" timeout={300}>
				<Routes>
					<Route path="/" element={<Main />} name="app" handler={App}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/hero" element={<Hero />}></Route>
						<Route path="/app-ide" element={<AppDiseaseId />}></Route>
						<Route path="/app-app" element={<UnderConstruction />}></Route>
						<Route path="/app-jou" element={<UnderConstruction />}></Route>
						<Route path="/app-moo" element={<UnderConstruction />}></Route>
						<Route path="/app-reco" element={<UnderConstruction />}></Route>
						<Route path="/app-calo" element={<UnderConstruction />}></Route>
						<Route path="/app-quo" element={<UnderConstruction />}></Route>
						<Route path="/account" element={<UnderConstruction />}></Route>
						
					</Route>
					<Route path="/*" element={<NotFound />} name="app" handler={App}></Route>
				</Routes>
			</CSSTransition>
		</TransitionGroup>
		// </AuthProvider>
	);
}

export default App;
