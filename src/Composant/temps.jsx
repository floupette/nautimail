
import { FaTriangleExclamation } from "react-icons/fa6";export const Temps = () => {
    return(
        <>
        {/* //Section d'avertissement pour la limitatio, de la fréquence d'envoi */}
        <span className="wrongtimes">

            {/* //Icone d'avertissement  */}
            <FaTriangleExclamation  className="wrongicon"/>
            
            {/* //Texte d'avertissement */}
            <p className="wrongtext">
                Vous ne pouvez pas envoyer plus d'une demande de connexion toutes les 10 secondes.
            </p>
        </span>
        </>
    )
}