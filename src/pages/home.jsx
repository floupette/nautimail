import { useState, useEffect } from 'react';
import { IoMdUnlock } from 'react-icons/io';
import { FaDownLong } from 'react-icons/fa6';
import Logo from '../assets/logonotmail.png';
import { Invalide } from '../Composant/invalide';
import { useLocation, useNavigate } from 'react-router-dom';
import { Temps } from '../Composant/temps';

// Fonction pour remplacer les espaces par des tirets bas dans une chaîne
function remplacerEspacesParTirets_bas(str) {
  return str.replace(/ /g, '_');
}

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State pour gérer l'entreprise sélectionnée, le mot de passe, la validité du mot de passe, etc.
  const [selectedFirm, setSelectedFirm] = useState('');
  const [enteredPassword, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTimes, setIsTimes] = useState(false);
  const [canAttempt, setCanAttempt] = useState(true);
  const [firms, setFirms] = useState([]);
  const formattedFirmName = remplacerEspacesParTirets_bas(selectedFirm);

  // Fonction pour récupérer la liste des entreprises depuis l'API
  const selection = () =>{

    fetch('http://localhost:8000/users')
      .then((response) => response.json())
      .then((data) => {
        setFirms(data.users);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des entreprises', error);
      });
  };

// Effet de côté pour appeler la fonction de récupération des entreprises lorsque le chemin de l'URL change  
useEffect(()=>{
  selection()
},[location.pathname]);
  
// Effet de côté pour gérer le temporisateur et réinitialiser l'état après un certain temps
  useEffect(() => {
    let timer;

    const resetState = () => {
      setIsTimes(false);
      setCanAttempt(true);
      setIsPasswordValid(true);
    
    };
    const resetSelected = () =>{
      setSelectedFirm('');
      selection()
      
      
    }

    if (isTimes) {
      timer = setTimeout(() => {
        resetState();
        resetSelected();
        // Le navigate('/') est pour revenir à la page d'accueil,
        // mais cela dépend de la structure de routes.
        // Si '/admin' est la page d'accueil par exemple.
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
      
      // Autres actions de nettoyage si nécessaire
    };
  }, [isTimes, canAttempt,isPasswordValid,selectedFirm,selection, navigate]);

  // Fonction pour gérer le changement de l'entreprise sélectionnée
  const handleFirmChange = (e) => {
    setSelectedFirm(e.target.value);
  };

  // Fonction pour gérer le changement de mot de passe
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Fonction pour soumettre le formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Vérification si une tentative est autorisée
    if (!canAttempt) {
      setIsTimes(true);
      return;
    }

    //Tentative de connexion avec l'API
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firm_name: selectedFirm,
          password: enteredPassword,
        }),
      });

      //Vérification de la réponse du serveur
      if (response.ok) {
        const data = await response.json();

        if (data && data.token) {
          localStorage.setItem('jwtToken', data.token);

          const isAdmin = data.user.is_admin;

          if (isAdmin) {
            navigate(`/admin/`, {
              state: { formattedFirmName, selectedFirm, firms },
            });
          } else {
            navigate(`/utilisateur/${formattedFirmName}`, {
              state: { formattedFirmName, selectedFirm, user: data.user },
            });
          }
        }
      } else {
        setIsPasswordValid(false);
        setIsTimes(true);
        setCanAttempt(false);
      }

      //Gestion des erreurs
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  // Rendu du composant d'accueil avec le formulaire de connexion et les éléments visuels
  return (
    <>
    {/* //Logo de l'application */}
      <div id="alignlogo">
        <img id="logo" src={Logo} alt="Logo" />
      </div>

      {/* //Section principale du formulaire de connexion */}
      <section className='main'>

      {/* //Affichage du composant Invalide si le mot de passe n'est pas valide   */}
      {!isPasswordValid && <div><Invalide /></div>}

      {/* //Formulaire de connexion */}
      <form action="" onSubmit={handleSubmit}>
        
        {/* //Champ de saisie pour sélectionner l'entreprise */}
        <div className="input" id="user">
          <input
            list="firmsList"
            value={selectedFirm}
            onChange={handleFirmChange}
            placeholder="Votre entreprise"
          />

          {/* //Liste déroulante avec les entreprises disponibles */}
          <datalist id="firmsList">
            {firms.map((firm, index) => (
              <option key={index} value={firm.firm_name} />
            ))}
          </datalist>

          {/* //Icone */}
          <FaDownLong id="arrowselect" />
        </div>

        {/* //Champ de saisie pour le mot de passe */}
        <div className="input" id="password">
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={enteredPassword}
            onChange={handlePasswordChange}
          />

          {/* //Bouton de soumission du formulaire */}
          <button id="btnconnexion" type="submit">
            <IoMdUnlock id="lock" />
          </button>
        </div>
        
      </form>
      
      {/* //Affichage du composant Temps si la limite de demande de connexion est atteinte */}
      {isTimes && <div><Temps /></div>}
      </section>
    </>
  );
};
