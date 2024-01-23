import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';
import { FaArrowLeft } from "react-icons/fa6";
import { EntrepriseEdit } from '../Composant/entrepriseEdit';

export const EditEntreprise = ({ onReturn }) => {

  //Utilisation de useLocation pour accéder aux informations de l'URL
  const location = useLocation();

  // Navigate pour la navigation
  const navigate = useNavigate();

  //Extraction des données de l'état de l'URL
  const { state: company } = location;

  // Fonction de retour vers le composant parent (Admin) avec les données mises à jour
  const handleReturn = () => {
    onReturn(company);
    // Retour à la page parent (Admin)
    navigate(-1); 
  };

  return (
    <>
      <div id='alignlogo'> <img id='logo' src={Logo} alt="Logo" /></div>
      <section className='main'>

        {/* //Barre de navigation avec bouton de retour */}
        <span id='return'>
          <div onClick={handleReturn} id='rtrnbtn'>
            <FaArrowLeft  id='arrow' />
          </div>
          <h1>Entreprise</h1>
        </span>

        {/* //Composant EntrepriseEdit pour la modificatiob des données de l'entreprise */}
        <EntrepriseEdit onClick={() => handleSaveData(company)} />
      </section>
    </>
  );
};
