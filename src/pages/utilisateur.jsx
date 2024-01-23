// Utilisateur.jsx
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navbar } from '../Composant/navbar';
import { Courrier } from '../Composant/courrier';
import { NoCourrier } from '../Composant/nocourrier';

export const Utilisateur = () => {
    //Le hook de navigation
    const navigate = useNavigate();

    //Le hook de localisation pour accéder aux informations de l'URL
    const location = useLocation();

    //Destruction des données passées via location.state
    const {user: entreprise, selectedFirm } = location.state ;

    // État pour indiquer s'il y a de nouveaux courriers
    const [hasNewMail, setHasNewMail] = useState(false);
    useEffect(() => {
        // Fonction asynchrone pour vérifier l'état du courrier
        const checkMailStatus = async () => {

            // Récupération du jeton d'authentification depuis le stockage local
            const token = localStorage.getItem('jwtToken');
            try {
                // Appel à l'API pour obtenir l'état du courrier pour l'entreprise sélectionnée
                const response = await fetch(`http://localhost:8000/users/${selectedFirm}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // Vérification si la réponse est réussie (status 200)
                if (response.ok) {
                    // Extraction des données de la réponse JSON
                    const data = await response.json();

                    // Mise à jour de l'état hasNewMail avec la valeur de has_mail provenant de l'API
                    setHasNewMail(data.user.has_mail);
                }
            } catch (error) {

                // Gestion des erreurs en cas d'échec de l'appel à l'API
                console.error('Erreur lors de la vérification du courrier:', error);
            }
        };

        // Appel initial de la fonction de vérification du courrier
        checkMailStatus();

        // Vérification périodique de l'état du courrier avec un intervalle de 60 secondes
        const interval = setInterval(checkMailStatus, 500);

        // Nettoyage de l'intervalle à la fin du composant
        return () => clearInterval(interval);
    }, [selectedFirm]);

    // Rendu du composant utilisateur avec la barre de navigation et le contenu en fonction de l'état du courrier
    return (
        <>
            <Navbar />
            <section className='mainNav'>
            {hasNewMail ? <Courrier /> : <NoCourrier />}
            </section>
        </>
    );
};
