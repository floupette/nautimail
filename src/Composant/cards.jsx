import React, { useState, useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const Cards = ({ work, onSelectedItemsChange, onFormDataEdit }) => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState(work ? Array(work.length).fill(false) : []);

  // Checkbox
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

  const handleEdit = (company) => {
    onFormDataEdit(company);
    
  };

  const handleNavigate = (path, company) => {
    navigate(path, { state: { company } });
  };
  const formatdate = (company) => {
    const date = new Date(company.last_pick_up);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  

  return (
    <>
      {work && (
        <div>
          {work.map((company, i) => (
            <div key={i}>
              <details
                id='sousmenu'
                className={`${company.is_admin ? 'adminColorSM' : 'normalColorSM'}`}>
                <summary
                  id='carte'
                  className={`${company.is_admin ? 'adminColor' : 'normalColor'}`}>
                  <div id='titre'>
                    <h2>{company.firm_name}</h2>
                    <h3>{`${company.first_name} ${company.last_name}`}</h3>
                    
                    <h4>{formatdate(company)}</h4>
                  </div>
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
                <div id='contact'>
                  <h4>
                    <strong>Email :</strong>
                    <br />
                    {company.email}
                  </h4>
                  <h4>
                    <strong>Tél :</strong> {company.phone_number}
                  </h4>
                  {/* Ajoutez ici d'autres informations spécifiques à afficher dans chaque carte */}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
