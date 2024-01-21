import { useState, useEffect, useRef } from "react"
import "../styles/Message.scss";

export default function Message(props) {

    const messageRef =  useRef();
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (props.last) {
            console.log(`Rendered last ${props.message}`);
            props.scrollToBottom()
        }
        
        setTimeout(() => {
            setAnimationClass("visible")
        }, 10);

    }, [])

    return (
        <div className={("messageBubble" +  " " + animationClass + " " + (props.last ? " last" : "") )} ref={messageRef}>
            {props.message}
        </div>
    )
}