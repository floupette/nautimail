import { RiUserForbidFill } from "react-icons/ri";
export const Invalide = () => {
    return(
        <>
        <span className="wrong"><RiUserForbidFill className="wrongicon"/><p className="wrongtext">Utilisateur ou mot de passe incorrecte</p></span>
        </>
    )
}