import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate("/hero")
    }, [])

    return (

        <div className="Home">
            Home page
        </div>

    )
}