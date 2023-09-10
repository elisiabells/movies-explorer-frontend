import React from 'react';

function MovieCard({ movie, isSavedMoviePage, onSave, onDelete, savedMovies }) {
  console.log("savedMovies из муви кард:", savedMovies);
  const isSaved = !isSavedMoviePage && savedMovies.some((item) => item && item.movieId === movie.id);

  function handleSaveClick() {
    onSave(movie);
  }

  function handleDeliteClick() {
    onDelete(movie);
  }

  // Функция для конвертации длительности фильма в формат часов и минут
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const baseUrl = "https://api.nomoreparties.co/";
  const imageUrl = isSavedMoviePage ? movie.image : baseUrl + movie.image.url;

  return (
    <div className='movies-card' key={movie.id}>
      <div className='movies-card__image-container'>
        <a href={movie.trailerLink} target="blank">
          <img src={imageUrl} alt={movie.nameRU} className='movies-card__image' />
        </a>
        {isSavedMoviePage ? (
          <button className='movies-card__delete-button movies-card__save-button' onClick={handleDeliteClick}>
          </button>
        ) : (
          <button
            className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
            onClick={handleSaveClick}
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