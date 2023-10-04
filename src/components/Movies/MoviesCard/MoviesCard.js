import React from 'react';
import { BASE_URL } from '../../../utils/config';
import { formatDuration } from '../../../utils/config';

function MovieCard({ movie, isSavedMoviePage, onSave, onDelete, savedMovies }) {
  const imageUrl = isSavedMoviePage ? movie.image : BASE_URL + movie.image.url;
  const isSaved = savedMovies.some(item => item?.movieId === movie.id);

  // Обработчик клика на кнопку "Сохранить"
  const handleSave = () => {
    onSave(movie);
  };

  // Обработчик клика на кнопку "Удалить"
  const handleDelete = () => {
    onDelete(movie);
  };

  return (
    <div className='movies-card'>
      <div className='movies-card__image-container'>
        <a href={movie.trailerLink} target="blank">
          <img src={imageUrl} alt={movie.nameRU} className='movies-card__image' />
        </a>
        {isSavedMoviePage ? (
          <button className='movies-card__delete-button movies-card__save-button' onClick={handleDelete}>
          </button>
        ) : (
          <button
            className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
            onClick={handleSave}
          >
            {isSaved ? '' : 'Сохранить'}
          </button>
        )}
      </div>
      <div className='movies-card__details'>
        <span className='movies-card__title'>{movie.nameRU}</span>
        <span className='movies-card__duration'>{formatDuration(movie.duration)}</span>
      </div>
    </div>
  );
}

export default MovieCard;