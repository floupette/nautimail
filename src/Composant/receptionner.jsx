import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";


export const Receptionner = ({ updateIsMail }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedFirm, user: user } = location.state || {};
    const [open, setOpen] = useState(false);

    const sendConfirmation = async () => {
        const token = localStorage.getItem('jwtToken');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        });

        try {
            const response = await fetch(`http://localhost:8000/users/${selectedFirm}/reception`, {
                method: 'POST',
                headers: headers,
            });

            // Convertir la réponse en JSON
            const responseData = await response.json();

            // Afficher la réponse dans la console

            if (response.ok) {
                // Mise à jour de l'état dans le composant parent
                if (typeof updateIsMail === 'function') {
                    updateIsMail(false);
                }

            } else {
                console.error("Erreur lors de l'envoi de la confirmation");
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const handleConfirmation = () => {
        setOpen(false); // Fermeture du modal
        sendConfirmation(); // Envoyer la confirmation au serveur
    };

    return (
        <>
            <button id='recp' onClick={() => setOpen(true)}>Réceptionner</button>
            <Modal id='modal' open={open} onClose={() => setOpen(false)} center>
                <h2 id="txtchoix">Confirmer la réception du courrier :</h2>
                <div id="choix">
                    <AiFillCloseCircle id="choixNon" onClick={() => setOpen(false)} />
                    <AiFillCheckCircle id="choixOui" onClick={handleConfirmation} />
                </div>
            </Modal>
        </>
    );
};

