import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
// import TakeQuiz from './views/TakeQuiz';
import { UserType } from './types';
import { getMe } from './lib/apiWrapper';
 

export default function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') &&
        new Date(localStorage.getItem('tokenExp') || 0) > new Date()
        ? true
        : false
  );
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    async function getLoggedInUser() {
      if (isLoggedIn) {
        const token = localStorage.getItem('token') || '';
        const response = await getMe(token);
        if (response.data) {
          setLoggedInUser(response.data);
          localStorage.setItem('currentUser', JSON.stringify(response.data)); 
        } else {
          setIsLoggedIn(false); 
          console.error(response.data);
        }
      }
    }
    getLoggedInUser();
  }, [isLoggedIn]);


  const logUserIn = () => {
    setIsLoggedIn(true);
  };

  const logUserOut = () => {
    setIsLoggedIn(false); 
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    localStorage.removeItem('currentUser'); 
  };


  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
        <Container>
          <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} />} />
            <Route path='/register' element={<Register />} />
            <Route path="/login" element={<Login logUserIn={logUserIn} />} />
          </Routes>
        </Container>
    </>
  );
}