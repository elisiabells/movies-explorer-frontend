import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
// import Preloader from "../Movies/Preloader/Preloader";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Логотип</Link>
          <Link to="/movies">Фильмы</Link>
          <Link to="/saved-movies">Сохранённые фильмы</Link>
          <Link to="/signup">Регистрация</Link>
          <Link to="/signin">Авторизация</Link>
          <Link to="/profile">Аккаунт</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<h1>404: Страница не найдена</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
