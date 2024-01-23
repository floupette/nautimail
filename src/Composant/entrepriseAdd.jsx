import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Admin } from '../pages/admin';

export const EntrepriseAdd = () => {
  const navigate = useNavigate();

  //Etat local pour stocker les données du formulaire
  const [entrepriseData, setEntrepriseData] = useState({
    firm_name: '',
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
    is_admin: false,
  });

  //Fonction qui gère les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEntrepriseData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //Fonction qui gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Obtient le token JWT du stockage local
    const token = localStorage.getItem('jwtToken');

    try {

      //Envoie une requête POST au serveur avec les données du formulaire
      const response = await fetch(`http://localhost:8000/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrepriseData),
      });

      //Vérifie si la requête a reussi
      if (response.ok) {

        // Navigue vers la route '/admin' après le succès de l'envoi
        navigate(-1);
      } else {
        console.error('Erreur lors de l\'envoi des données');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  //Fonction qui gère l'annulation de l'ajout d'entreprise
  const handleDelete = async () => {

    // Navigue vers la route '/admin'
    navigate(-1);
  };
  return (
    <>
    {/* //Formulaire d'ajout d'entreprise */}
      <form id='entreprise' onSubmit={handleSubmit}>
        <section id='cntrform'>

          {/* //Champs du formulaire */}
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
            <input id="password" type="password" name="password" value={entrepriseData.password} onChange={handleChange} required minLength="4" maxLength="4" placeholder="0102" />
          </div>
          <div className="form">
            <label htmlFor="admin">Admin :</label>
            <input id="checkbox" type="checkbox" checked={entrepriseData.is_admin} onChange={handleChange} name="is_admin" />
          </div>

          {/* //Boutons de suppression et d'ajout */}
          <span id='btnform'>
            <button id='supprimer' type="button" onClick={handleDelete}>Supprimer</button>
            <button id='ajouter' type="submit">Terminer</button>
          </span>
        </section>
      </form>
    </>
  );
};
