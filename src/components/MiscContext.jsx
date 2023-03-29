import React, { useState, useEffect } from "react"
import { green, red, internetPresent } from "../scripts/Misc"

export const MiscContext = React.createContext()

export const useMisc = () => {
    return React.useContext(MiscContext)
}

export const MiscProvider = ({ children }) => {
    const [internetTimer, setInternetTimer] = useState(null)
    const [isOnline, setIsOnline] = useState(null)

    const IS_ONLINE = () => isOnline

    const checkForInternet = () => {
        console.log("checking Navigator for connection...")
        if (!navigator.onLine) {
            setIsOnline(false)
            setInternetTimer(setTimeout(checkForInternet, 5000))
            return
        }
        internetPresent()
            .then(() => setIsOnline(true))
            .catch(() => setIsOnline(false))

        setInternetTimer(setTimeout(checkForInternet, 5000))
    }

    useEffect(() => {
        // checkForInternet()
        /*
            ______ ____  ____  _____ _        ___        _ _
            | ____|  _ \/ ___|| ____| |      / _ \ _ __ | (_)_ __   ___
            |  _| | | | \___ \|  _| | |     | | | | '_ \| | | '_ \ / _ \
            | |___| |_| |___) | |___| |___  | |_| | | | | | | | | |  __/
            |_____|____/|____/|_____|_____|  \___/|_| |_|_|_|_| |_|\___|

        */

        return () => {
            clearTimeout(internetTimer)
        }
    }, [])

    const value = {
        isOnline,
        IS_ONLINE,
    }

    return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>
}