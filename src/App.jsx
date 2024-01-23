import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Utilisateur } from './pages/utilisateur';
import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { AddEntreprise } from './pages/addentreprise';
import { EditEntreprise } from './pages/editentreprise';

export const App = () => {
  //State pour stocker les données de l'administrateur
  const [adminData, setAdminData] = useState(null);

  // Fonction pour traiter la soumission de formulaire dans la page admin
  const saveNavigate = (data) => {
  };

  // Fonction pour traiter la soumission de formulaire d'ajout d'entreprise
  const saveFirm=(company) =>{
  }
  
   // Fonction pour traiter la soumission de formulaire de l'utilisateur
  const handleFormSubmit = (formData) => {

  };

  // Configuration du routage avec React Router
  return (
    <BrowserRouter>
      <Routes>
        {/* //Page d'accueil */}
        <Route path='/' element={<Home onFormSubmit={handleFormSubmit} />} />

        {/* //Page administrateur */}
        <Route path='/admin/' element={<Admin onFormDataSubmit={saveNavigate} onFormDataEdit={ saveFirm } adminData={adminData} />} />

        {/* //Page d'ajout d'entreprise dans la section admin */}
        <Route path='/admin/formulaire/add' element={<AddEntreprise onReturn={setAdminData} />} />

        {/* //Page d'édition d'entreprise dans la section admin  */}
        <Route path='/admin/formulaire/edit/' element={<EditEntreprise onReturn={setAdminData} />} />
        
        {/* //Page utilisateur avec un paramètre de nom d'entreprise */}
        <Route path='/utilisateur/:firm_name/*' element={<Utilisateur />} />
      </Routes>
    </BrowserRouter>
  );
};
