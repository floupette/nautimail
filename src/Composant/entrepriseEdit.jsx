import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Admin } from '../pages/admin';

export const EntrepriseEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: firm } = location;


  const [entrepriseData, setEntrepriseData] = useState({
    firm_name: '',
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
    is_admin: false,
  });

  useEffect(() => {
    if (firm && firm.company) {
      setEntrepriseData({
        firm_name: firm.company.firm_name || '',
        last_name: firm.company.last_name || '',
        first_name: firm.company.first_name || '',
        phone_number: firm.company.phone_number || '',
        email: firm.company.email || '',
        password: firm.company.password || '',
        is_admin: firm.company.is_admin || false,
      });
    }
  }, [firm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEntrepriseData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');

    try {
      const response = await fetch(`http://localhost:8000/users/${entrepriseData.firm_name}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrepriseData),
      });

      if (response.ok) {
    
        navigate(-1);
        
      } else {
        console.error('Erreur lors de l\'envoi des données');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`http://localhost:8000/users/${entrepriseData.firm_name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate(-1);
      } else {
        console.error('Erreur lors de la suppression de l\'entreprise');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de suppression:', error);
    }
  };
  return (
    <>
      <form id='entreprise' onSubmit={handleSubmit}>
        <section id='cntrform'>
          <div className="form">
            <label htmlFor="nom">Entreprise :</label>
            <input id="entnom" type="text" name="firm_name" value={entrepriseData.firm_name} onChange={handleChange} placeholder="Entreprise" required />
          </div>
          <div className="form" >
            <label htmlFor="nom">Contact :</label>
            <span id='formcontact'>
              <input id="contnom" type="text" name="last_name" value={entrepriseData.last_name} onChange={handleChange} placeholder="Nom" required />
              <br />
              <input id="prenom" type="text" name="first_name" value={entrepriseData.first_name} onChange={handleChange} placeholder="Prénom" required />
            </span>
          </div>
          <div className="form">
            <label htmlFor="tel">Téléphone :</label>
            <input id="tel" type="tel" name="phone_number" value={entrepriseData.phone_number} onChange={handleChange} required minLength="10" maxLength="10" placeholder="0102030405" />
          </div>
          <div className="form">
            <label htmlFor="email">Email :</label>
            <input id="email" type="email" name="email" value={entrepriseData.email} onChange={handleChange} placeholder="email@mail.com" required />
          </div>
          <div className="form">
            <label htmlFor="password">Identifiant :</label>
            <input id="password" type="password" name="password" value={entrepriseData.password} onChange={handleChange} required minLength="4" placeholder="0102" />
          </div>
          <div className="form">
            <label htmlFor="admin">Admin :</label>
            <input id="checkbox" type="checkbox" checked={entrepriseData.is_admin} onChange={handleChange} name="is_admin" />
          </div>
          <span id='btnform'>
            <button id='supprimer' type="button" onClick={handleDelete}>Supprimer</button>
            <button id='ajouter' type="submit">Terminer</button>
          </span>
        </section>
      </form>
    </>
  );
};
