import "../styles/ChatWindow.scss";
import Message from "./Message";

export default function ChatWindow(props) {


    return (
        <div className="chatWindow">
            <div className="chatHeader">
                <span className="name">Niya</span>
                <span className="status">{props.status}</span>
            </div>
            <div className="chatBox" ref={props.chatBoxRef}>
                {
                    props.messages.map((message, index) => {
                        return (
                            <div className={"messageContainer " + message.sender} key={index}>
                                <Message message={message.message} last={props.messages.length === (index + 1)} scrollToBottom={props.scrollToBottom} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}