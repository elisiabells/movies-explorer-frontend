 // Сохранение фильма
 const handleSaveMovie = (movie) => {
   const existingMovie = savedMovies.find(savedMovie => savedMovie._id === movie._id);

   if (existingMovie) {
     return handleDeleteMovie(existingMovie._id);
   } else {
     return mainApi.savedMovie(movie)
       .then((savedMovie) => {
         setSavedMovies(prevMovies => [...prevMovies, savedMovie]);
         return savedMovie;
       });
   }
 };
 // Удаление фильма
 const handleDeleteMovie = (movieId) => {
   return mainApi.removeMovie(movieId)
     .then(() => {
       const updatedMovies = savedMovies.filter(movie => movie._id !== movieId);
       setSavedMovies(updatedMovies);
     })
     .catch((err) => {
       console.error('Ошибка при удалении фильма: ', err);
     });
 }



 // это из муви кард 
 const [isSaved, setIsSaved] = useState(movie.isSaved);

 const handleSaveClick = () => {
   if (isSaved) {
     console.log("Фильм уже был сохранен");
     return;
   }

   onSave(movie)
     .then(() => {
       setIsSaved(true);
     })
     .catch((err) => {
       console.error('Ошибка при сохранении фильма: ', err);
     });
 };

 const handleDeleteClick = () => {
   onDelete(movie._id)
     .then(() => {
       setIsSaved(false);
     })
     .catch((err) => {
       console.error('Ошибка при удалении фильма: ', err);
     });
 };

 // app
   // Сохранение фильма
   const handleSaveMovie = (movie) => {
    return mainApi.savedMovie(movie)
      .then((savedMovie) => {
        setSavedMovies(prevMovies => [...prevMovies, savedMovie]);
        return savedMovie;
      })
      .catch((err) => {
        console.error('Ошибка при сохранении фильма: ', err);
      });
  };

   // Поиск фильмов
   const handleSearchMovies = (query) => {
    const lowercaseQuery = query.toLowerCase();
    const searchResult = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredMovies(searchResult);
  };

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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className='page'>
        {!hideForHeader.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={
            <Movies
              movies={movies}
              error={error}
              isLoading={isLoading}
              onSearch={handleSearchMovies}
              savedMovies={savedMovies}
              onSave={handleSaveMovie}
            />}
          />
          <Route path='/saved-movies' element={
            <SavedMovies
              savedMovies={savedMovies}
              onDelete={handleDeleteMovie}
            />} />
          <Route path='/profile' element={
            <Profile
              onLogout={handleLogout}
              onUpdateProfile={handleUpdateProfile}
            />}
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