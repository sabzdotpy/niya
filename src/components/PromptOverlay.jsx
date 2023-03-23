import React from "react";

import { useEffect } from "react";
import "../styles/PromptOverlay.scss";


// import { FiX } from "react-icons/fi";

/*
PROPS:
    - required = if true, removes the close button, and doesn't close on clicking outside the main div.
    - closeOverlay = callback when either close button is clicked or outside div is clicked.
    - noprompt = removes center square div. useful when wanting to have different main div.
    - header = custom header to show. visible only if noprompt is false.
*/
function PromptOverlay(props) {

    useEffect(() => {
        console.log("init prompt overlay");
        console.log(props)
    }, []);

    return (
        <div className="prompt_overlay" onClick={props.closeOverlay}>
            { (!props.required) ? 
            <span>x</span>           
            // <FiX
            //     className="close"
            //     title="Close"
            //     size={30}
            //     stroke={"rgb(197, 70, 70)"}
            //     onClick={props.closeOverlay}
            // />
             : null }

            { (!props.noprompt) ? (<div
                className="prompt"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="header">{props.header}</div>

                <div className="content">
                    { props.children }
                </div>

            </div>) : props.children }
        </div>
    );
}

export default PromptOverlay;
