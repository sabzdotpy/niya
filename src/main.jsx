import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/ScrollBarStyles.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { MiscProvider } from "./contexts/MiscContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<MiscProvider>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</MiscProvider>
	// /* </React.StrictMode>, */
);
