import React from 'react';
import MovieCard from '../MoviesCard/MoviesCard';
import { moviesList } from '../../../utils/moviesImg'

function MoviesCardList() {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {moviesList.map(movie => (
          <MovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
      <div className='movies-card-list__more'>
        <button className='movies-card-list__button' type='button'> Ещё </button>
      </div>
    </div>
  );
}

export default MoviesCardList;