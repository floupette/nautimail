import { RiUserForbidFill } from "react-icons/ri";

  // Composant qui est affiché en cas d'utilisateur ou de mot de passe incorrect
export const Invalide = () => {
    return(
        <>
        {/* //Container contenant l'icone et le message */}
        <span className="wrong">

            {/* //Icone  */}
            <RiUserForbidFill className="wrongicon"/>
            <p className="wrongtext">
                Utilisateur ou mot de passe incorrecte
            </p>
        </span>
        </>
    )
}