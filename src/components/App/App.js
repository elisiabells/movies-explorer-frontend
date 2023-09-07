import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

import Auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const hideForHeader = ['/sign-in', '/sign-up', '/not-found'];
  const hideForFooter = ['/sign-in', '/sign-up', '/profile', '/not-found'];

  const auth = new Auth();

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.user);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error("Ошибка при проверке токена: ", err);
        });
    }
  }, []);

  // Регистрация пользователя
  const handleRegister = (data) => {
    return auth.signup(data)
      .then((user) => {
        navigate('/movies');
        return user;
      });
  };

  // Авторизация пользователя
  const handleLogin = (data) => {
    return auth.signin(data)
      .then((res) => {
        Cookies.set('jwt', res.token);
        setCurrentUser(res.user);
        setLoggedIn(true);
        navigate('/movies');
        return res.user;
      });
  };

  // Выход из системы
  const handleLogout = () => {
    auth.signout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.error("Ошибка при выходе из системы: ", err);
      });
  };

  const handleUpdateUser = ({name, email}) => {
    mainApi.updateUserProfile({name, email})
        .then((res) => {
            setCurrentUser({
                name: res.name,
                email: res.email
            });
            // Тут вы можете вызвать попап успешного редактирования, если это необходимо
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
            // Тут вы можете вызвать попап ошибки редактирования, если это необходимо
        });
}

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className='page'>
        {!hideForHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile onLogout={handleLogout} />} />

          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />

          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
        {!hideForFooter.includes(location.pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;