import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Utilisateur } from './pages/utilisateur';
import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { AddEntreprise } from './pages/addentreprise';
import { EditEntreprise } from './pages/editentreprise';

export const App = () => {

  const [adminData, setAdminData] = useState(null);

  const saveNavigate = (data) => {
  };
  const saveFirm = (company) => {
  }


  const handleFormSubmit = (formData) => {
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home onFormSubmit={handleFormSubmit} />} />
        <Route path='/admin/' element={<Admin onFormDataSubmit={saveNavigate} onFormDataEdit={saveFirm} adminData={adminData} />} />
        <Route path='/admin/formulaire/add' element={<AddEntreprise onReturn={setAdminData} />} />
        <Route path='/admin/formulaire/edit/' element={<EditEntreprise onReturn={setAdminData} />} />

        <Route path='/utilisateur/:firm_name/*' element={<Utilisateur />} />
      </Routes>
    </BrowserRouter>
  );
};
