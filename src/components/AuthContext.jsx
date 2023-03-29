import React, { useState, useEffect } from "react"
import { auth, database } from "./firebaseCtx"
import { green, red, pink } from "../scripts/Misc"

import {
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    updateProfile,
    setPersistence,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signOut,
} from "firebase/auth"
import { set, ref, child, get, onValue, query, orderByChild, startAt, limitToFirst, equalTo } from "firebase/database"

export const AuthContext = React.createContext()

const GoogleProvider = new GoogleAuthProvider()
GoogleProvider.setCustomParameters({
    prompt: "select_account",
})

const FaceBookProvider = new FacebookAuthProvider()
FaceBookProvider.setCustomParameters({
    prompt: "select_account",
})

const GithubProvider = new GithubAuthProvider()
GithubProvider.setCustomParameters({
    prompt: "select_account",
})

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [USER_METADATA, SET_USER_METADATA] = useState()
    const [USER_MISCDATA, SET_USER_MISCDATA] = useState()
    const [author] = useState("Sabz")

    const SET_USER = (user) => {
        console.trace("SET_USER called from children")
        setCurrentUser(user)
    }

    const GET_USER = () => {
        return currentUser
    }

    const USER_PRESENT = () => {
        if (currentUser === "none" || !currentUser) return false;
        else if (currentUser) return true;
    }

    const signin = (username, password) => {
        return signInWithEmailAndPassword(auth, username, password)
    }

    const signinwithpopup = (provider) => {
        console.log("sign in with")
        if (provider === "google") {
            console.log("logging with google")
            return signInWithPopup(auth, GoogleProvider)
        } else if (provider === "facebook") {
            console.log("logging with facebook")
            return signInWithPopup(auth, FaceBookProvider)
        } else if (provider === "github") {
            console.log("logging with gh")
            return signInWithPopup(auth, GithubProvider)
        }
    }

    const signinwithredirect = (provider) => {
        if (provider === "google") {
            return signInWithRedirect(auth, GoogleProvider)
        } else if (provider === "facebook") {
            return signInWithRedirect(auth, FaceBookProvider)
        } else if (provider === "github") {
            return signInWithRedirect(auth, GithubProvider)
        }
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth)
    }

    const changedisplayname = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    const setpersistence = (persistence) => {
        setPersistence(auth, persistence)
    }

    useEffect(() => {
        console.log("[AuthContext.jsx] start")
        const unsubscribe = auth.onAuthStateChanged((user) => {
            pink("[onAuthStateChanged from AuthContext.jsx]")
            if (user) {
                green("[AuthContext] user found!")
                setCurrentUser(user)

                // user.getIdToken().then((token) => pink(token, "USER TOKEN", true))
            } else {
                red("[AuthContext] no logged in user found.")
                console.log(user)
                setCurrentUser("none")
            }
        })

        return () => unsubscribe()
    }, [])

    const testWrite = (userID, username, email) => {
        try {
            const rootRef = ref(database, "root")
            const emailPath = `emails_list/${userID}`
            const usernamePath = `username_list/${username}`
            return rootRef.update(
                { emailPath : email, usernamePath: userID }
            )
        } catch (e) {
            console.error(e)
        }
        
    }

    const writeUserMetaData = (userId, displayName, username, email, dateofbirth) => {
        return set(ref(database, "root/users_metadata/" + userId), {
            displayname: displayName,
            username: username,
            email: email,
            dateofbirth: dateofbirth,
        })
    }

    const writeUserMiscData = (userID) => {
        return set(ref(database, "root/users_miscdata/" + userID), {
            hasloggedinforthefirsttime: false,
            hasverifiedemail: false,
        })
    }

    const appendUsernameToUsernamesList = (userId, username) => {
        return set(ref(database, "root/username_list/" + username), {
            id: userId,
        })
    }

    const appendEmailToEmailsList = (userId, email) => {
        return set(ref(database, "root/emails_list/" + userId), {
            email: email,
        })
    }

    const getUserMetaData = (userID) => {
        console.log("reading user data...")

        return new Promise((resolve, reject) => {
            onValue(ref(database, `users_metadata/${userID}`), (snapshot) => {
                if (snapshot.val()) {
                    SET_USER_METADATA(snapshot.val())
                    resolve(snapshot.val())
                } else {
                    reject("No data found")
                }
            })
        })
    }

    const getUserMiscData = (userID) => {
        console.log("reading user data...")

        return new Promise((resolve, reject) => {
            onValue(ref(database, `users_miscdata/${userID}`), (snapshot) => {
                if (snapshot.val()) {
                    SET_USER_MISCDATA(snapshot.val())
                    resolve(snapshot.val())
                } else {
                    reject("No data found")
                }
            })
        })
    }

    // testing

    const getDataSortByDOB = () => {
        const query = query(ref(database, "users_metadata"), orderByChild("dateofbirth"))

        get(query)
            .then((snapshot) => {
                console.log(snapshot)
            })
            .catch((error) => {
                red("Error in getDobSort")
                console.log(error)
            })
    }

    const getPostData = (postID) => {
        const posts = [
            {
                id: 1,
                author: "Sabz",
                author_picture: "none",
                date: "02-10-2004",
                gig_topic: "Hacking",
                text: "I want programmer to hack nasa thanku",
            },
            {
                id: 2,
                author: "Jeff",
                author_picture: "none",
                date: "12-01-2022",
                gig_topic: "Game Development",
                text: "Muck",
            },
            {
                id: 3,
                author: "Joe",
                author_picture: "file too large",
                date: "06-09-2021",
                gig_topic: "Other",
                text: "mama",
            },
        ]

        return new Promise((resolve, reject) => {
            if (postID === "all") resolve(posts)

            if (postID == 1 || postID == 2 || postID == 3) {
                resolve(posts[postID - 1])
            } else {
                reject("ID Not Found")
            }
        })
    }

    const value = {
        author,
        currentUser,
        GET_USER,
        SET_USER,
        USER_PRESENT,
        USER_METADATA,
        USER_MISCDATA,
        signin,
        signout,
        signinwithpopup,
        signinwithredirect,
        signup,
        changedisplayname,
        writeUserMetaData,
        writeUserMiscData,
        getUserMetaData,
        getUserMiscData,
        appendUsernameToUsernamesList,
        appendEmailToEmailsList,
        setpersistence,

        getPostData,
        getDataSortByDOB,

        testWrite
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}