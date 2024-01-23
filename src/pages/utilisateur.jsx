// Utilisateur.jsx
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navbar } from '../Composant/navbar';
import { Courrier } from '../Composant/courrier';
import { NoCourrier } from '../Composant/nocourrier';

export const Utilisateur = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const { user: entreprise, selectedFirm } = location.state;


    const [hasNewMail, setHasNewMail] = useState(false);
    useEffect(() => {
        // Vérification initiale pour l'état du courrier
        const checkMailStatus = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const response = await fetch(`http://localhost:8000/users/${selectedFirm}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setHasNewMail(data.user.has_mail);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du courrier:', error);
            }
        };

        checkMailStatus();

        // Vérification périodique de l'état du courrier
        const interval = setInterval(checkMailStatus, 500); // Vérifie toutes les 60 secondes

        return () => clearInterval(interval);
    }, [selectedFirm]);


    return (
        <>
            <Navbar />
            <section className='mainNav'>
                {hasNewMail ? <Courrier /> : <NoCourrier />}
            </section>
        </>
    );
};
