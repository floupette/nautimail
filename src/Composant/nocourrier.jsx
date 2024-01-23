import { IoMdMail } from "react-icons/io";

 // Composant qui est affiché lorsque l'utilisateur n'a pas de courrier en attente
export const NoCourrier = () => {

    return (
        <>
        {/* //Div contenant l'icone et le message */}
        <div className="courrier">

            {/* //Icone de l'enveloppe */}
            <IoMdMail className="iconcourrier" />

            <h2>Aucun courrier en attente</h2>
        </div>
        </>
    )
};
