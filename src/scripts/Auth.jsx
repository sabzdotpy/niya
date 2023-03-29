import React, { useEffect, useState } from "react";
import firebaseConfig from "./dbfunctions.js";
import { initializeApp } from "firebase/app";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		const app = initializeApp(firebaseConfig);
		//   app.auth().onAuthStateChanged((user) => {
		//     setCurrentUser(user)
		//     setPending(false)
		//   });
	}, []);
	return !pending ? (
		<AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
	) : (
		<span> no user! </span>
	);
};

// if (pending) {
//     return (
//         <div>
//             Loading
//         </div>
//     )
// }

// if (!pending) {
//     return (
//         <AuthContext.Provider value={ {currentUser} } >
//             { children }
//         </AuthContext.Provider>
//     )
// }

//   if (!pending) {
//         return (
//             <AuthContext.Provider
//             value={{
//                 currentUser
//             }}
//             >
//             {children}
//             </ AuthContext.Provider >
//         )
//     }
//}
