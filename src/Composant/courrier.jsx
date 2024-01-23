import { IoMdMailUnread } from "react-icons/io";
import { Receptionner } from "./receptionner";



export const Courrier = ({data2}) => {
    


    return (
        <>
            <div className="courrier"><IoMdMailUnread className="iconcourrier" />
                <h2>Vous avez du courrier en attente</h2>
                <Receptionner data2={data2}/>
            </div>
        </>

    )

}