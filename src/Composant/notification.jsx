import { useEffect, useRef, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import Modal from "react-responsive-modal";

export const Notification = ({ selectedItems}) => {

  //Etat local pour gérer l'ouverture et la fermeture de la modal
  const [open, setOpen] = useState(false);

  //Référence à l'élément de liste dans la modal
  const listRef = useRef(null);

  // Effet pour faire défiler la liste vers le bas à chaque mise à jour de selectedItems
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [selectedItems]);

  // Fonction pour envoyer les notifications par e-mail
  const handleSendMail = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('http://localhost:8000/notify_mail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firmsToNotify: selectedItems.map(e => e.firm_name) }),
      });

      if (response.ok) {

        // Fermer le modal après l'envoi des notifications
        setOpen(false);
      } else {
        console.error('Erreur lors de l\'envoi des notifications');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des notifications:', error);
    }
  };

  return (
    <>
    {/* //Icone pour ouvrir la modal de notification */}
      <BiMailSend id='send' onClick={() => setOpen(true)} />

      {/* //Modal de notification */}
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 id="messageNotif">Vous vous apprêtez à notifier</h2>

        {/* //Liste des entreprises sélectionnées */}
        {selectedItems && (
          <div ref={listRef} id='liste'>
            <ul>
              {selectedItems.map((company, i) => (
                <li key={i}>{company.firm_name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* //Bouton pour annuler ou envoyer les notifications */}
        <span id='btnnotif'>
          <button id='annuler' type="button" onClick={() => setOpen(false)}>Annuler</button>
          <button id='envoyer' type="submit" onClick={handleSendMail}>Envoyer</button>
        </span>
      </Modal>
    </>
  );
};
