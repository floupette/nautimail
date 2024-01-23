import { IoMdMail } from "react-icons/io";

export const NoCourrier = () => {

    return (
        <>
            <div className="courrier"><IoMdMail className="iconcourrier" />
                <h2>Aucun courrier en attente</h2>
            </div>
        </>
    )
};
