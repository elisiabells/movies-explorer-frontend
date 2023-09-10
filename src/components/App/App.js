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
  const [allMovies, setAllMovies] = useState([]); // загруженные фильмы при поиске
  const [savedMovies, setSavedMovies] = useState([]); // сохраненные фильмы
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [serverError, setServerError] = useState('');

  // Функция регистрации
  const handleRegister = ({ name, email, password }) => {
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
        setServerError(err.message || 'Что-то пошло не так.');
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
        setServerError(err.message || 'Что-то пошло не так.');
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

// Функция обновления профиля
const handleUpdateProfile = ({ email, name }) => {
  mainApi.updateUser({ email, name })
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
    })
    .catch((err) => {
      setError(err.message);  
      setServerError(err.message || 'Что-то пошло не так.'); 
    });
};

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
  }, []);

  // Получение сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.error('Ошибка при получении сохраненных фильмов: ', err);
      });
  }, []);

  // Сохранение фильма 
  // const handleSaveMovie = (movie) => {
  //   const isSaved = savedMovies.some((item) => item.movieId === movie.id);

  //   if (!isSaved) {
  //     mainApi
  //       .savedMovie(movie)
  //       .then((savedMovie) => {
  //         setSavedMovies([...savedMovies, savedMovie.data]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     const movieToDelete = savedMovies.find(
  //       (item) => item.movieId === movie.id
  //     );

  //     if (movieToDelete && movieToDelete._id) {
  //       const movieId = savedMovies.find(
  //         (item) => item.movieId === movie.id
  //       )._id;
  //       mainApi
  //         .removeMovie(movieId)
  //         .then(() => {
  //           setSavedMovies((movies) =>
  //             movies.filter((item) => item._id !== movieId)
  //           );
  //         })
  //         .catch((err) => {
  //           console.error("Ошибка при удалении фильма:", err);
  //         });
  //     } else {
  //       console.error("Не удалось найти _id фильма для удаления.");
  //     }
  //   }
  // };

  // function handleDeleteMovie(movie) {
  //   return  mainApi
  //   .removeMovie(movie._id)
  //     .then(() => {
  //       setSavedMovies((savedMovies) =>
  //         savedMovies.filter((item) => item._id !== movie._id)
  //       );
  //     })
  //     .catch((err) => {
  //       console.error("Ошибка при удалении фильма:", err);
  //     });
  // }

  // Сохранение фильма item._id 
  const handleSaveMovie = (movie) => {
    console.log("Переданный фильм:", movie);
    console.log("Все сохраненные фильмы savedMovies:", savedMovies);

    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (savedMovies.some(item => item === undefined)) {
      console.error("В массиве savedMovies есть undefined элементы!");
      return;
    }
    if (!isSaved) {
      mainApi.savedMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie.data]);
        })
        .catch((err) => {
          console.error('Ошибка при сохранении фильма: ', err);
        });
    } else {
      const deleteMovies = savedMovies.find(
        (item) => item._id === movie.id
      );

      if (deleteMovies && deleteMovies._id) {
        mainApi.removeMovie(deleteMovies._id)
          .then(() => {
            setSavedMovies((movies) =>
              movies.filter((item) => item._id !== deleteMovies._id)
            );
          })
          .catch((err) => {
            console.error("Ошибка при удалении фильма:", err);
          });
      } else {
        console.error("Не удалось найти _id фильма для удаления.");
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