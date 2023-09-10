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

  // Сохранение фильма item._id 
  const handleSaveMovie = (movie) => {
    
    console.log("Переданный фильм:", movie);
    console.log("Все сохраненные фильмы savedMovies:", savedMovies);

    const isSaved = savedMovies.some((item) => item.id !== movie.id);
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