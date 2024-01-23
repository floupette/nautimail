import React, { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';




export const Navbar = () => { 
    const location = useLocation();

    //Récupération de selectedFirm depuis l'état de l'emplacement
    const { selectedFirm } = location.state ;


    return (
        <>
            {/* //Barre de navigation */}
            <nav id='navbar'>

                {/* //Logo de l'application */}
                <img id='logonav' src={Logo} alt="Logo" />
                
                {/* //Section de centrage avec le nom de l'entreprise sélectionnée et le bouton de déconnexion */}
                <span id='centrage'>

                    {/* //Affichage du nomde l'entreprise sélectionnée */}
                    <h1 id="nom">Bonjour,<br/> {selectedFirm}</h1> 

                    {/* //Bouton de déconnesion lié à la page d'accueil */}
                    <NavLink to='/'>
                        <button id='deco'>Déconnexion</button>
                    </NavLink>
                </span>
            </nav>
        </>
    );
};
