import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';
import { FaArrowLeft } from "react-icons/fa6";
import { EntrepriseAdd } from '../Composant/entrepriseAdd';

export const AddEntreprise = ({ onReturn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  //Extraction des données de l'état de l'URL
  const { state: data } = location;
  
  //Fonction de reotur vers le composant parent (Admin) avec les données mise à jour
  const handleReturn = () => {
    onReturn(data);
    // Retour à la page parent (Admin)
    navigate(-1);
  };
  return (
    <>
    {/* //Affichage du logo */}
      <div id='alignlogo'> <img id='logo' src={Logo} alt="Logo" /></div>
      <section className='main'>
        {/* //Barre de navigation avec bouton de retour */}
        <span id='return'>
          <div  onClick={handleReturn} id='rtrnbtn'>
            <FaArrowLeft id='arrow' />
          </div>
          <h1>Entreprise</h1>
        </span>
        {/* //Composant EntrepriseAdd pour l'ajout d'une nouvelle entreprise */}
        <EntrepriseAdd firm={data.firm} />
      </section>
    </>
  );
};
