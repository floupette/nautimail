import { IoMdMailUnread } from "react-icons/io";
import { Receptionner } from "./receptionner";


 // Le composant Courrier affiche une icône de courrier non lu avec un message indiquant qu'il y a du courrier en attente.
export const Courrier = ({data2}) => {

    return (
        <>
            {/* //Div contenant l'icone, le message et le composant Receptionner */}
            <div className="courrier">

                {/* //Icone */}
                <IoMdMailUnread className="iconcourrier" />

                {/* //Message */}
                <h2>Vous avez du courrier en attente</h2>

                {/* //Composant Recepetionner qui gère la réception du courrier */}
                <Receptionner data2={data2}/>
            </div>
        </>

    )

}