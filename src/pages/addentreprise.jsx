import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';
import { FaArrowLeft } from "react-icons/fa6";
import { EntrepriseAdd } from '../Composant/entrepriseAdd';

export const AddEntreprise = ({ onReturn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: data } = location;


  const handleReturn = () => {
    // Appel de la fonction de retour vers le composant parent (Admin) avec les données mises à jour
    onReturn(data);
    // Retour à la page parent (Admin)
    navigate(-1);
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
        <EntrepriseAdd firm={data.firm} />
      </section>
    </>
  );
};
