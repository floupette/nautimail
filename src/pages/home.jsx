import { useState, useEffect } from 'react';
import { IoMdUnlock } from 'react-icons/io';
import { FaDownLong } from 'react-icons/fa6';
import Logo from '../assets/logonotmail.png';
import { Invalide } from '../Composant/invalide';
import { useLocation, useNavigate } from 'react-router-dom';
import { Temps } from '../Composant/temps';

function remplacerEspacesParTirets_bas(str) {
  return str.replace(/ /g, '_');
}

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFirm, setSelectedFirm] = useState('');
  const [enteredPassword, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTimes, setIsTimes] = useState(false);
  const [canAttempt, setCanAttempt] = useState(true);
  const [firms, setFirms] = useState([]);
  const formattedFirmName = remplacerEspacesParTirets_bas(selectedFirm);


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
useEffect(()=>{
  selection()
},[location.pathname]);
  

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
        // Vous pouvez utiliser navigate('/') pour revenir à la page d'accueil,
        // mais cela dépend de votre structure de routes.
        // Si '/admin' est la page d'accueil, vous devrez ajuster en conséquence.
        // navigate('/');
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
      
      // Autres actions de nettoyage si nécessaire
    };
  }, [isTimes, canAttempt,isPasswordValid,selectedFirm,selection, navigate]);

  const handleFirmChange = (e) => {
    setSelectedFirm(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canAttempt) {
      setIsTimes(true);
      return;
    }

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
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <>
      <div id="alignlogo">
        <img id="logo" src={Logo} alt="Logo" />
      </div>
      <section className='main'>
      {!isPasswordValid && <div><Invalide /></div>}
      <form action="" onSubmit={handleSubmit}>
        
        <div className="input" id="user">
          <input
            
            list="firmsList"
          
            value={selectedFirm}
            onChange={handleFirmChange}
            placeholder="Votre entreprise"
          />
          <datalist id="firmsList">
            {firms.map((firm, index) => (
              <option key={index} value={firm.firm_name} />
            ))}
          </datalist>
          <FaDownLong id="arrowselect" />
        </div>
        <div className="input" id="password">
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={enteredPassword}
            onChange={handlePasswordChange}
          />
          <button id="btnconnexion" type="submit">
            <IoMdUnlock id="lock" />
          </button>
        </div>
        
      </form>
      
      {isTimes && <div><Temps /></div>}
      </section>
    </>
  );
};
// import { useState, useEffect } from 'react';
// import { IoMdUnlock } from "react-icons/io";
// import { FaDownLong } from "react-icons/fa6";
// import Logo from '../assets/logonotmail.png';
// import { Invalide } from '../Composant/invalide';
// import { useNavigate } from "react-router-dom";
// import { Temps } from '../Composant/temps';

// export const Home = () => {
//     const navigate = useNavigate();
//     const [selectedFirm, setSelectedFirm] = useState('');
//     const [enteredPassword, setPassword] = useState('');
//     const [isPasswordValid, setIsPasswordValid] = useState(true);
//     const [isTimes, setIsTimes] = useState(false);
//     const [canAttempt, setCanAttempt] = useState(true);
//     const [firms, setFirms] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/users')
//             .then(response => response.json())
//             .then(data => {
//                 setFirms(data.users);
//             })
//             .catch(error => {
//                 console.error("Error fetching firms", error);
//             });
//     }, []);

//     const handleFirmChange = (e) => {
//         setSelectedFirm(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!canAttempt) {
//             setIsTimes(true);
//             return;

//         }

//         // Effectuer la requête de connexion
//         fetch('http://localhost:8000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 firm_name: selectedFirm, // Assurez-vous que cela correspond aux attentes du backend
//                 password: enteredPassword,
//             }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data && data.token) {
//                 // Stockez le token dans localStorage ou un état global si nécessaire
//                 localStorage.setItem('jwtToken', data.token);

//                 if (data.user.is_admin) {
//                     navigate('/admin', { state: { selectedFirm, firms } });
//                 } else {
//                     navigate(`/utilisateur/${selectedFirm}`, { state: { selectedFirm, user: data.user } });
//                 }
//             } else {
//                 setIsPasswordValid(false);
//                 setIsTimes(true);
//                 setCanAttempt(false);
//             }
//         })
//         .catch(error => {
//             console.error('Error during login:', error);
//         });
//     };
  
//     return (
//         <>
//             <div id='alignlogo'> <img id='logo' src={Logo} alt="Logo" /></div>
//             <form onSubmit={handleSubmit}>
//                 {!isPasswordValid && <Invalide />}
//                 <div className='input' id='user'>
//                     <input
//                         type='text'
//                         list='firmsList'
//                         value={selectedFirm}
//                         onChange={handleFirmChange}
//                         placeholder="Votre entreprise"
//                     />
//                     <datalist id='firmsList'>
//                         {firms.map((firm, index) => (
//                             <option key={index} value={firm.firm_name} />
//                         ))}
//                     </datalist>
//                     <FaDownLong id='arrow' />
//                 </div>
//                 <div className='input' id='password'>
//                     <input
//                         type='password'
//                         placeholder="Votre mot de passe"
//                         value={enteredPassword}
//                         onChange={handlePasswordChange}
//                     />
//                     <button id="btnconnexion" type="submit">
//                         <IoMdUnlock id='lock' />
//                     </button>
//                 </div>
//                 {isTimes && <Temps />}
//             </form>
//         </>
//     );
// };

