import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

function App() {
  const [loggedIn] = useState(true);
  const location = useLocation();
  const hideForRoutes = ['/sign-in', '/sign-up', '/profile', '/not-found'];

  return (
    <div className='page'>
      {!hideForRoutes.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
      {!hideForRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;