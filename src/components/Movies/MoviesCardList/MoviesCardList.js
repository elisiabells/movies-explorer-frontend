import React from 'react';
import MovieCard from '../MoviesCard/MoviesCard';
import { moviesList } from '../../../utils/moviesImg'

function MoviesCardList() {
  return (
    <><div className='movies-list'>
      {moviesList.map(movie => (
        <MovieCard key={movie.movieId} movie={movie} />
      ))}
    </div>
      <div className='movies-list__more'>
        <button className='movies-list__button' type='button'> Ещё </button>
      </div></>
  );
}

export default MoviesCardList;