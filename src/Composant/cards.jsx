import React, { useState, useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const Cards = ({ work, onSelectedItemsChange, onFormDataEdit }) => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState(work ? Array(work.length).fill(false) : []);

  // Gestion du changements d'état des Checkbox
  const handleCheck = (index) => {
    setChecks((prevChecks) => {
      const newChecks = [...prevChecks];
      newChecks[index] = !newChecks[index];
      return newChecks;
    });
  };

  // Fonction pour récupérer les éléments sélectionnés
  const getSelectedItems = () => {
    return work.filter((_, index) => checks[index]);
  };

  // Effet pour traiter les éléments sélectionnés dès que le toggle est activé
  useEffect(() => {
    const selectedItems = getSelectedItems();
    onSelectedItemsChange(selectedItems);
  }, [checks, onSelectedItemsChange]);

  //Fonction pour gérer l'édition d'une entreprise
  const handleEdit = (company) => {
    onFormDataEdit(company);
  };

  //Fonction pour naviguer vers une route spécifique avec les données de l'entreprise
  const handleNavigate = (path, company) => {
    navigate(path, { state: { company } });
  };

  const formatdate = (company) => {
    
    //Crée une nouvelle instance de Date en utilisant la propriété last_pick_up de l'objet company
    const date = new Date(company.last_pick_up);
    
    // Extrait les composants de la date (jour, mois, année, heures, minutes, secondes)
    const day = date.getDate();// Jour du mois (de 1 à 31)
    const month = date.getMonth() + 1; // Mois (de 0 à 11) ; ajoute 1 pour obtenir le mois réel (de 1 à 12)
    const year = date.getFullYear(); // Année (format à 4 chiffres)
    const hours = date.getHours(); // Heures (de 0 à 23)
    const minutes = date.getMinutes(); // Minutes (de 0 à 59)
    const seconds = date.getSeconds(); // Secondes (de 0 à 59)

    // Retourne la date formatée sous forme de chaîne de caractères
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  return (
    <>
      {work && (
        <div>
          {work.map((company, i) => (
            <div key={i}>

              {/* //Détails de la carte avec les informations de l'entreprise */}
              <details
                id='sousmenu'
                className={`${company.is_admin ? 'adminColorSM' : 'normalColorSM'}`}>
                <summary
                  id='carte'
                  className={`${company.is_admin ? 'adminColor' : 'normalColor'}`}>
                  
                  {/* //En-tête de la carte avec le nom, le contact et la dernière collecte */}
                  <div id='titre'>
                    <h2>{company.firm_name}</h2>
                    <h3>{`${company.first_name} ${company.last_name}`}</h3>
                    <h4>{formatdate(company)}</h4>
                  </div>

                  {/* //Boutons d'édition et de sélection + icone d'édition + checkbox */}
                  <div id='btns'>
                    <BiSolidEdit
                      id='btnEdit'
                      onClick={() => {
                        handleNavigate(`/admin/formulaire/edit`, company);
                        handleEdit(company);
                      }}
                    />
                    <label className='toggleButton'>
                      <input
                        type='checkbox'
                        checked={checks[i] ?? false}
                        onChange={() => handleCheck(i)}
                      />
                      <span className='knob'></span>
                    </label>
                  </div>
                </summary>

                {/* //Informations de contact supplémentaires */}
                <div id='contact'>
                  <h4>
                    <strong>Email :</strong>
                    <br />
                    {company.email}
                  </h4>
                  <h4>
                    <strong>Tél :</strong> {company.phone_number}
                  </h4>
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
