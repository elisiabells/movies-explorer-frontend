import React from 'react';

function MovieCard({ movie, isSavedMoviePage, onSave, onDelete, savedMovies }) {
  const baseUrl = "https://api.nomoreparties.co/";
  const imageUrl = isSavedMoviePage ? movie.image : baseUrl + movie.image.url;
  const isSaved = !isSavedMoviePage && savedMovies.some(item => item?.movieId === movie.id);

  // Сохранить
  function handleSave() {
    onSave(movie);
  }

  // Удалить
  function handleDelite() {
    onDelete(movie);
  }

  // Функция для конвертации длительности фильма в формат часов и минут
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className='movies-card'>
      <div className='movies-card__image-container'>
        <a href={movie.trailerLink} target="blank">
          <img src={imageUrl} alt={movie.nameRU} className='movies-card__image' />
        </a>
        {isSavedMoviePage ? (
          <button className='movies-card__delete-button movies-card__save-button' onClick={handleDelite}>
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