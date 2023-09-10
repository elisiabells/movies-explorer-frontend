import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
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
  const [movies, setMovies] = useState([]); // загруженные фильмы при поиске
  const [savedMovies, setSavedMovies] = useState([]); // сохраненные фильмы

  // Функция регистрации
  const handleRegister = ({ name, email, password }, setServerError) => {
    authApi
      .signup({ name, email, password })
      .then((data) => {
        console.log(data);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        if (err.message === 'Пользователь с таким email уже существует.') {
          setServerError('Пользователь с таким email уже существует.');
        } else {
          setServerError('При регистрации пользователя произошла ошибка.');
        }
      });
  };

  // Функция входа
  const handleLogin = ({ email, password }) => {
    authApi
      .signin(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          return mainApi.getCurrentUser();
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Функция выхода
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('isShortFilmChecked');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('inputValue');
    setLoggedIn(false);
    setCurrentUser(null);
    setError(null);
    setMovies([]);
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
        .then(savedMoviesData => {
          setSavedMovies(savedMoviesData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Функция обновления профиля
  const handleUpdateProfile = ({ email, name }) => {
    mainApi.updateUser({ email, name })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Получение списка фильмов
  useEffect(() => {
    setIsLoading(true);
    moviesApi.getInitialMovies()
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении фильмов: ', err);
        setError('Ошибка при загрузке фильмов');
        setIsLoading(false);
      });
  }, []);

  // Получение сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        console.log('Получение сохраненных фильмов:', movies);
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.error('Ошибка при получении сохраненных фильмов: ', err);
      });
  }, []);

  // Сохранение фильма item.movieId
  const handleSaveMovie = (movie) => {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    console.log("Переданный фильм:", movie);
    console.log("Все сохраненные фильмы savedMovies:", savedMovies);
    if (!isSaved) {
      mainApi.savedMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie.data]);
        })
        .catch((err) => {
          console.error('Ошибка при сохранении: ', err);
        });
    } else {
      const deleteMovies = savedMovies.find(
        (item) => item.movieId === movie.id
      );

      if (deleteMovies && deleteMovies._id) {
        const movieId = savedMovies.find(
          (item) => item.movieId === movie.id
        )._id;
        mainApi.removeMovie(movieId)
          .then(() => {
            setSavedMovies((movies) =>
              movies.filter((item) => item._id !== movieId)
            );
          })
          .catch((err) => {
            console.error('Ошибка при удалении: ', err);
          });
      } else {
        console.error('Идентификатор фильма не найден');
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
        console.error('Ошибка при удалении: ', err);
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
                component={Movies}
                movies={movies}
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
                component={Profile}
                onLogout={handleLogout}
                onUpdateProfile={handleUpdateProfile}
              />
            }
          />

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