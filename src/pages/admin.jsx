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
  const [input, setInput] = useState('');
  const { formatedFirmName, firms, selectedFirm } = location.state || {};
  const [initialFirm, setInitialFirm] = useState(firms || []);
  const [firm, setFirm] = useState(firms || []);
  const [selection, setSelection] = useState([]);


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
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getEntreprise(input);
      setFirm(data ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

const getEntreprise = (input) => {
  if (input.trim() === '') {
    return initialFirm || [];
  } else {
    return (initialFirm || []).filter(({ firm_name, first_name, last_name }) =>
      firm_name.toLowerCase().startsWith(input.toLowerCase()) ||
      first_name.toLowerCase().startsWith(input.toLowerCase()) ||
      last_name.toLowerCase().startsWith(input.toLowerCase())
    );
  }
};




  const handleSelectedItemsChange = (selectedItems) => {
    if (!arraysAreEqual(selectedItems, selection)) {
      setSelection(selectedItems);
    }
  };

  useEffect(() => {
    if (selection.length > 0) {
      
    }
  }, [selection]);

  const arraysAreEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  const handleNavigate = (path) => {
    
    navigate(path, {
      state: { firms, selectedFirm },
    });
  };

  const navigateToAddForm = () => {
    handleNavigate('/admin/formulaire/add');
  };

  const handleSaveData = () => {
    // Appel de la fonction de rappel pour envoyer les données à App
    onFormDataSubmit({ formatedFirmName, firm });
    onFormDataEdit({ firm, formatedFirmName });
    
  };
  


  return (
    <>
      <Navbar />
      <section className='mainNav'>
        <form id='formSC' onSubmit={handleSubmit}>
          <input id='inputSC' type='text' value={input} placeholder='Rechercher' onChange={handleChange} />
          <button id='buttonSC' type='submit'>
            <HiMagnifyingGlass className='searchbutton' />
          </button>
        </form>
        <div>
          <Cards work={firm} onSelectedItemsChange={handleSelectedItemsChange} onFormDataEdit={onFormDataEdit} onClick={() => { handleSaveData(); }} />
        </div>
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
