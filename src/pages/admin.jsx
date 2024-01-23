import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../Composant/navbar';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoAddCircle } from 'react-icons/io5';
import { Cards } from '../Composant/cards';
import { Notification } from '../Composant/notification';

export const Admin = ({ onFormDataSubmit, onFormDataEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();

  //State pour la barre de recherche
  const [input, setInput] = useState('');

  //Extraction des données de l'état de l'URL
  const { formatedFirmName, firms, selectedFirm } = location.state || {};

  //State pour stocker les entreprises initiales et modifiées
  const [initialFirm, setInitialFirm] = useState(firms || []);
  const [firm, setFirm] = useState(firms || []);

  // State pour gérer la sélection des entreprises
  const [selection, setSelection] = useState([]);


  // Effet pour récupérer les entreprises depuis l'API lors du montage du composant
  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => {
        setFirm(data.users);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des entreprises', error);
      });
  }, []);

   // Fonction pour mettre à jour le state lors du changement de la barre de recherche
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Fonction pour soumettre le formulaire de recherche
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getEntreprise(input);
      setFirm(data ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour filtrer les entreprises en fonction de la recherche
  const getEntreprise = (input) => {

    // Si l'input est une chaîne vide ou ne contient que des espaces, retourne le tableau initialFirm entier
    if (input.trim() === '') {
      return initialFirm || [];
    } else {

      // Si l'input n'est pas vide, filtre le tableau initialFirm en fonction des critères de recherche
      return (initialFirm || []).filter(({ firm_name, first_name, last_name }) =>
        firm_name.toLowerCase().startsWith(input.toLowerCase()) ||
        first_name.toLowerCase().startsWith(input.toLowerCase()) ||
        last_name.toLowerCase().startsWith(input.toLowerCase())
      );
    }
  };
  

  // Fonction pour gérer le changement de la sélection d'entreprises
  const handleSelectedItemsChange = (selectedItems) => {
    if (!arraysAreEqual(selectedItems, selection)) {
      setSelection(selectedItems);
    }
  };

  // Effet pour afficher les éléments sélectionnés dans la console
  useEffect(() => {
    if (selection.length > 0) {
    }
  }, [selection]);

  // Fonction pour comparer deux tableaux
  const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

   // Fonction pour gérer la navigation vers une autre page
  const handleNavigate = (path) => {
    navigate(path, {
      state: { firms, selectedFirm },
    });
  };

   // Fonction pour naviguer vers la page d'ajout d'une entreprise
  const navigateToAddForm = () => {
    handleNavigate('/admin/formulaire/add');
  };

  // Fonction pour sauvegarder les données du formulaire édité
  const handleSaveData = () => {
    onFormDataSubmit({ formatedFirmName, firm });
    onFormDataEdit({ firm, formatedFirmName });
  };


  return (
    <>
      <Navbar />
      <section className='mainNav'>

        {/* //Formulaire de recherche */}
        <form id='formSC' onSubmit={handleSubmit}>
          <input id='inputSC' type='text' value={input} placeholder='Rechercher' onChange={handleChange} />
          <button id='buttonSC' type='submit'>
            <HiMagnifyingGlass className='searchbutton' />
          </button>
        </form>

        {/* //Section pour afficher les cartes des entreprises */}
        <div>
          <Cards work={firm} onSelectedItemsChange={handleSelectedItemsChange} onFormDataEdit={onFormDataEdit} onClick={() => { handleSaveData(); }} />
        </div>

        {/* //Section pour les boutons d'ajout et de notification */}
        <div id='btn'>
          <IoAddCircle id='add' onClick={() => { navigateToAddForm(); handleSaveData(); }} />
          <div id='sendbtn'>
            <Notification selectedItems={selection} />
          </div>
        </div>
      </section>
    </>
  );
};
