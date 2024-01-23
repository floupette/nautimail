import { FaTriangleExclamation } from "react-icons/fa6";

export const Temps = () => {
    return (
        <>
            <span className="wrongtimes"><FaTriangleExclamation className="wrongicon" /><p className="wrongtext">Vous ne pouvez pas envoyer plus d'une demande de connexion toutes les 10 secondes.</p></span>
        </>
    )
}