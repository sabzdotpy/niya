import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Main from "./pages/Main";
import Meta from "./pages/Meta";
import NotFound from "./pages/NotFound";

import Hero from "./views/Hero";
import Home from "./views/Home";
import AppDiseaseId from "./views/AppDiseaseId";
import Journal from "./views/Journal";
import AddJournalEntry from "./views/AddJournalEntry";
import Account from "./views/Account";
import UnderConstruction from "./views/UnderConstruction";
import Quotes from "./views/Quotes.jsx";
import MoodTracker from "./views/MoodTracker";
import Chat from "./views/Chat.jsx";

function App() {
	const location = useLocation();

	return (
		<TransitionGroup component={null}>
			<CSSTransition key={location.key} classNames="fade" timeout={300}>
				<Routes>
					<Route path="/" element={<Main />} name="app" handler={App}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/hero" element={<Hero />}></Route>
						<Route path="/meta" element={<Meta />}></Route>
						<Route path="/chat" element={<Chat />}></Route>
						<Route path="/app-ide" element={<AppDiseaseId />}></Route>
						<Route path="/app-app" element={<UnderConstruction />}></Route>
						<Route path="/app-jou" element={<Journal />}></Route>
						<Route path="app-jou/new" element={<AddJournalEntry />}></Route>
						<Route path="app-jou/:timestamp" element={<AddJournalEntry />}></Route>
						<Route path="/app-moo" element={<MoodTracker />}></Route>
						<Route path="/app-reco" element={<UnderConstruction />}></Route>
						<Route path="/app-calo" element={<UnderConstruction />}></Route>
						<Route path="/app-quo" element={<Quotes />}></Route>
						<Route path="/account" element={<Account />}></Route>
					</Route>
					<Route path="/*" element={<NotFound />} name="app" handler={App}></Route>
				</Routes>
			</CSSTransition>
		</TransitionGroup>
		// </AuthProvider>
	);
}

export default App;
