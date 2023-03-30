import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext" 

export default function Home() {

    const { currentUser } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        // navigate("/hero")
        
    }, [])

    return (

        <div className="Home">
            Welcome back { currentUser?.displayName }
        </div>

    )
}