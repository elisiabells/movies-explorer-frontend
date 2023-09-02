import React, { useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MovieCard from '../Movies/MoviesCard/MoviesCard';
import { moviesList } from '../../utils/moviesImg';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState(moviesList.slice(0, 3));

  const handleDeleteMovie = (movieId) => {
    const newSavedMovies = savedMovies.filter(movie => movie.movieId !== movieId);
    setSavedMovies(newSavedMovies);
  }

  return (
    <div className='saved-movies'>
      <SearchForm />
      <div className="movies-card-list__container">
        {savedMovies.map(movie => (
          <MovieCard key={movie.movieId} movie={movie} isSavedMoviePage={true} onDelete={handleDeleteMovie} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;
