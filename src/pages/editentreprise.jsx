import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';
import { FaArrowLeft } from "react-icons/fa6";
import { EntrepriseEdit } from '../Composant/entrepriseEdit';

export const EditEntreprise = ({ onReturn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: company } = location;

  const handleReturn = () => {
    // Appel de la fonction de retour vers le composant parent (Admin) avec les données mises à jour
    onReturn(company);
    // Retour à la page parent (Admin)
    navigate(-1); // Vous pouvez également utiliser le hook useHistory pour la navigation
  };

  return (
    <>
      <div id='alignlogo'> <img id='logo' src={Logo} alt="Logo" /></div>
      <section className='main'>
        <span id='return'>
          <div onClick={handleReturn} id='rtrnbtn'>
            <FaArrowLeft id='arrow' />
          </div>
          <h1>Entreprise</h1>
        </span>
        <EntrepriseEdit onClick={() => handleSaveData(company)} />
      </section>
    </>
  );
};
