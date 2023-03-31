import { forwardRef, useImperativeHandle, useState } from "react"
import { CSSTransition } from "react-transition-group"
import "../styles/InfoDiv.scss"


/*
FUNCTIONS:
    - show
        - text = text to show, if not provided div falls back to default 'something went wrong'.
        - type = 'alert' -> red background, 'success' -> green background. will fall back to alert if nothing is provided.
        - timeout = time delay before div auto closes. default 5 seconds.
    - hide
*/

const InfoDiv = forwardRef((props, ref) => {
    const [showdiv, setShow] = useState(false)
    const [text, setText] = useState("...")
    const [color, setColor] = useState("rgb(45, 136, 45)") // faint red
    const [timer, setTimer] = useState()

    const show = (text, type = "alert", timeout = 5000) => {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }

        setText(text || "Something went wrong.")
        if (type) {
            if (type === "success") {
                setColor("rgb(45, 136, 45)") // faint red
            }
            if (type === "alert") {
                setColor("rgb(181, 57, 57)") // light unsaturaetd green
            }
        }

        setShow(true)
        let temptimer = setTimeout(hide, timeout)
        console.log("set timer")
        setTimer(temptimer)
    }

    const hide = () => {
        setShow(false)
        console.log("clearing timeout")
        clearTimeout(timer)
        setTimer(null)
    }

    useImperativeHandle(ref, () => ({
        show,
        hide
    }))

    return (
        <CSSTransition in={showdiv} timeout={200} classNames="infodivanim" unmountOnExit>
            <div className="info_div" style={{ backgroundColor: color }}>
                <button className="close_info" onClick={hide}>
                    X
                </button>
                {text || "Something went wrong."}
            </div>
        </CSSTransition>
    )
})

export default InfoDiv
