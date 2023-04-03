import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext" 
import "../styles/Home.scss"

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nulla fugiat distinctio, enim similique iusto aliquid, ea nobis laborum nisi temporibus, ipsam iure. Expedita accusamus maxime quod exercitationem delectus culpa!

        </div>

    )
}