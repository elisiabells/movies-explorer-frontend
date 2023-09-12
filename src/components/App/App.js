import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { authApi } from '../../utils/AuthApi';
import { mainApi } from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideForHeader = ['/sign-in', '/sign-up', '/not-found'];
  const hideForFooter = ['/sign-in', '/sign-up', '/profile', '/not-found'];
  // Состояния
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [serverError, setServerError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [userSessionChanged, setUserSessionChanged] = useState(false);

  // // Функция регистрации
  const handleRegister = ({ name, email, password }) => {
    return authApi
      .signup({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        setRegisterError(err.message || 'Что-то пошло не так.');
      });
  };

  // Функция входа
  const handleLogin = ({ email, password }) => {
    return authApi.signin(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserSessionChanged(prev => !prev);
          navigate('/movies');
          return mainApi.getCurrentUser();
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError(err.message || 'Что-то пошло не так.');
      });
  };

  // Что бы не открывал sigin/signuo для авторизованных
  useEffect(() => {
    if (loggedIn && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
      navigate('/movies');
    }
  }, [loggedIn, location.pathname, navigate]);


  // Функция обновления профиля
  const handleUpdateProfile = ({ email, name }) => {
    return mainApi.updateUser({ email, name })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setShowPopup(true);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err.message || 'Что-то пошло не так.');
      });
  };

  // Функция выхода
  const handleLogout = () => {
    localStorage.clear();

    setLoggedIn(false);
    setUserSessionChanged(prev => !prev);
    setCurrentUser(null);
    setError(null);
    setAllMovies([]);
    setSavedMovies([]);
    navigate('/');
  };

  // Проверка JWT токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  // Получение списка фильмов
  useEffect(() => {
    setIsLoading(true);
    moviesApi.getInitialMovies()
      .then((data) => {
        setAllMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении фильмов: ', err);
        setError('Ошибка при загрузке фильмов');
        setIsLoading(false);
      });
  }, [userSessionChanged]);

  // Получение сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.error('Ошибка при получении сохраненных фильмов: ', err);
      });
  }, [userSessionChanged]);

  // Сохранение фильма 
  const handleSaveMovie = (movie) => {

    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (savedMovies.some(item => item === undefined)) {
      console.error("В массиве savedMovies есть undefined элементы!");
      return;
    }
    if (!isSaved) {
      mainApi.savedMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie]);
        })
        .catch((err) => {
          console.error('Ошибка при сохранении фильма: ', err);
        });
    } else {
      const deleteMovies = savedMovies.find(
        (item) => item.movieId === movie.id
      );

      if (deleteMovies && deleteMovies._id) {
        mainApi.removeMovie(deleteMovies._id)
          .then(() => {
            setSavedMovies((movies) =>
              movies.filter((item) => item._id !== deleteMovies._id)
            );
          })
          .catch((err) => {
            console.error('Ошибка при удалении фильма:', err);
          });
      } else {
        console.error('Не удалось найти фильм для удаления.');
      }
    }
  };

  // Удаление фильма
  const handleDeleteMovie = (movie) => {
    return mainApi.removeMovie(movie._id)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((item) => item._id !== movie._id)
        )
      })
      .catch((err) => {
        console.error('Ошибка при удалении фильма: ', err);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className='page'>
        {!hideForHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={<Main />} />

          <Route
            path='/movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={Movies}
                movies={allMovies}
                error={error}
                isLoading={isLoading}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
              />
            }
          />

          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={SavedMovies}
                savedMovies={savedMovies}
                onDelete={handleDeleteMovie}
              />
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={Profile}
                onLogout={handleLogout}
                onUpdateProfile={handleUpdateProfile}
                serverError={serverError}
                setServerError={setServerError}
              />
            }
          />

          <Route path='/sign-in'
            element={
              <Login
                onLogin={handleLogin}
                serverError={loginError}
                location={location}
                setServerError={setLoginError}
              />
            }
          />
          <Route path='/sign-up'
            element={
              <Register
                onRegister={handleRegister}
                serverError={registerError}
                location={location}
                setServerError={setRegisterError}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!hideForFooter.includes(location.pathname) && <Footer />}
        <InfoTooltip
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          message="Данные успешно изменены!"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;