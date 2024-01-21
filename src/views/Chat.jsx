import { useState, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import useArray from '../hooks/useArray';

import axios from "../scripts/axios";
import { useAuth } from "../contexts/AuthContext";

import "../styles/Chat.scss";

const Chat = () => {

    const { currentUser } = useAuth();

    const chatMessages = useArray([]);

    const [status, setStatus] = useState("online");
    const [niyaResponseLoading, setNiyaResponseLoading] = useState(false);
    const [niyaResponse, setNiyaResponse] = useState("Hi! I'm Niya, your personal assistant. How can I help you?");

    const messageBox = useRef();
    const chatBoxRef = useRef();

    const sendMessage = () => {
        if (messageBox.current.value === "") return;

        chatMessages.push({
            message: messageBox.current.value,
            sender: "user",
        });
        setNiyaResponseLoading(true);
        setStatus("typing...");

        axios.post("/chat", {
            message: messageBox.current.value,
            name: currentUser.displayName
        }).then((response) => {
            chatMessages.push({
                message: response.data.message,
                sender: "niya",
            });
            setStatus("online");
            setNiyaResponseLoading(false);
        }).catch((error) => {
            console.log(error);
            setStatus("error");
            setNiyaResponseLoading(false);
        });

        messageBox.current.value = "";
    }

    const scrollToBottom = () => {
        console.log("Scroll top working.")
        console.log(`${chatBoxRef.current.scrollHeight}`)
        chatBoxRef.current.scrollTop = `${chatBoxRef.current.scrollHeight - 1}`;
    }

    return (
        <div className="chat">
            <ChatWindow status={status} messages={chatMessages.value} chatBoxRef={chatBoxRef} scrollToBottom={scrollToBottom} />
            <div className="messageBox">
                <input 
                    type="text" 
                    placeholder='Type something...' 
                    disabled={niyaResponseLoading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    } } 
                    ref={messageBox} />
                <button onClick={sendMessage} disabled={niyaResponseLoading}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
