import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./pages/Main"
import Hero from "./views/Hero"
import Home from "./views/Home"

function App() {
	return (
		// <AuthProvider>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<Main />} name="app" handler={App}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/hero" element={<Hero />}></Route> 
					</Route>
					{/* <Route path="/pastes" element={<Pastes />} name="app" handler={App}></Route>
					<Route path="/meta" element={<Meta />} name="app" handler={App}></Route>
					<Route path="*" element={<NotFound />} name="app" handler={App}></Route> */}
				</Routes>
			</Router>
		// </AuthProvider>
	);
}

export default App;
