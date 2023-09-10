import React, { useState, useEffect } from 'react';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onSave, savedMovies, onDelete, isSavedMoviePage }) {
  // Состояние для хранения фильмов, отображаемых в текущий момент на экране
  const [displayedMovies, setDisplayedMovies] = useState([]);

  // Логика для определения количества карточек в зависимости от ширины экрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let count;
      if (width >= 1160) count = 12;
      else if (width >= 660) count = 8;
      else count = 5;
      setDisplayedMovies(movies.slice(0, count));
    };

    handleResize();
    const resizeTimeout = setTimeout(handleResize, 300);
    window.addEventListener('resize', handleResize);

    // Очистка слушателей и таймаутов при размонтировании компонента
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [movies]);

  // Обработчик для кнопки "Ещё"
  const handleMoreButtonClick = () => {
    const currentCount = displayedMovies.length;
    const width = window.innerWidth;
    let additionalCount;
    if (width >= 1280 || width >= 768) additionalCount = 6;
    else additionalCount = 2;
    setDisplayedMovies(movies.slice(0, currentCount + additionalCount));
  };

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {displayedMovies.map(movie => {
          return (
            <MovieCard
              key={movie.id ?? movie._id}
              movie={movie}
              isSavedMoviePage={isSavedMoviePage}
              onSave={onSave}
              savedMovies={savedMovies}
              onDelete={onDelete}
            />);
        })}
      </div>
      {displayedMovies.length < movies.length && (
        <div className='movies-card-list__more'>
          <button className='movies-card-list__button' type='button' onClick={handleMoreButtonClick}>
            Ещё
          </button>
        </div>
      )}
    </div>
  );
}

export default MoviesCardList;