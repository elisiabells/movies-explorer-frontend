import React, { useState } from 'react';

function MovieCard({ movie, isSavedMoviePage, onDelete }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className='movies-card'>
      <div className='movies-card__image-container'>
        <img src={movie.image} alt={movie.title} className='movies-card__image' />
        {isSavedMoviePage ? (
          <button className='movies-card__delete-button movies-card__save-button' onClick={() => onDelete(movie.movieId)}>
          </button>
        ) : (
          <button
            className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? '' : 'Сохранить'}
          </button>
        )}
      </div>
      <div className='movies-card__details'>
        <span className='movies-card__title'>{movie.title}</span>
        <span className='movies-card__duration'>{movie.duration}</span>
      </div>
    </div>
  );
}

export default MovieCard;