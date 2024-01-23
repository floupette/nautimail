import React, { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Logo from '../assets/logonotmail.png';

export const Navbar = () => {
    const location = useLocation();
    const { selectedFirm } = location.state;
    return (
        <>
            <nav id='navbar'>
                <img id='logonav' src={Logo} alt="Logo" />
                <span id='centrage'>
                    <h1 id="nom">Bonjour,<br /> {selectedFirm}</h1>
                    <NavLink to='/'><button id='deco'>Déconnexion</button></NavLink>
                </span>
            </nav>
        </>
    );
};
