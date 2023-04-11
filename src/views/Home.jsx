import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext" 
import "../styles/Home.scss"
import avatarHey from "../assets/hey-straight.png"
import ImageRenderer from "../components/ImageRenderer"

export default function Home() {

    const { currentUser } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        // navigate("/hero")
        
    }, [])

    return (

        <div className="Home">
            { (currentUser && currentUser !== "none") ? "Welcome back "+currentUser.displayName : "Hey" }
            <br /><br />
            <ImageRenderer src={avatarHey} height={350} width={300} />
            { (!currentUser || currentUser === "none") ? "Consider signing in to access all the features." : ""}

            Here are some things you can do:
            Write a diary entry
            Get book recommendations
            Get a random quote
        </div>

    )
}