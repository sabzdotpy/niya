import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { MiscProvider } from "./contexts/MiscContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<MiscProvider>
		<AuthProvider>
			<App />
		</AuthProvider>
	</MiscProvider>,
		// /* </React.StrictMode>, */
);
