import { useEffect, useRef, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import Modal from "react-responsive-modal";

export const Notification = ({ selectedItems }) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [selectedItems]);

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
      <BiMailSend id='send' onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 id="msgnotif">Vous vous apprêtez à notifier</h2>
        {selectedItems && (
          <div ref={listRef} id='liste'>
            <ul>
              {selectedItems.map((company, i) => (
                <li key={i}>{company.firm_name}</li>
              ))}
            </ul>
          </div>
        )}
        <span id='btnnotif'>
          <button id='annuler' type="button" onClick={() => setOpen(false)}>Annuler</button>
          <button id='envoyer' type="submit" onClick={handleSendMail}>Envoyer</button>
        </span>
      </Modal>
    </>
  );
};
