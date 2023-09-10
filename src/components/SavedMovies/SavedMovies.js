import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MovieCard from '../Movies/MoviesCard/MoviesCard';

function SavedMovies({ savedMovies, onDelete }) {
  console.log("savedMovies из сейв кард:", savedMovies);
  return (
    <div className='saved-movies'>
      <SearchForm />
      <div className="movies-card-list__container">
        {savedMovies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isSavedMoviePage={true}
            onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;

// import React, { useState, useEffect } from 'react';
// import SearchForm from '../Movies/SearchForm/SearchForm';
// import MovieCard from '../Movies/MoviesCard/MoviesCard';
// import { searchMovies } from '../../utils/filterMovies'; 

// function SavedMovies({ savedMovies, onDelete }) {
//    const [query, setQuery] = useState('');
//    const [isChecked, setChecked] = useState(false);
//    const [filteredMovies, setFilteredMovies] = useState(savedMovies);

//    // Фильтрация сохраненных фильмов на основе текущего запроса и состояния чекбокса
//    useEffect(() => {
//       const result = searchMovies(savedMovies, query, isChecked);
//       setFilteredMovies(result);
//    }, [savedMovies, query, isChecked]);

//    // Обработчик поиска фильмов
//    const handleSearchMovies = (newQuery) => {
//       setQuery(newQuery);
//    };

//    return (
//       <div className='saved-movies'>
//          <SearchForm
//             onSearch={handleSearchMovies}
//             isChecked={isChecked}
//             setChecked={setChecked}
//             initialValue=""
//          />
//          <div className="movies-card-list__container">
//             {filteredMovies.map(movie => (
//                <MovieCard
//                   key={movie._id}
//                   movie={movie}
//                   isSavedMoviePage={true}
//                   onDelete={onDelete}
//                />
//             ))}
//          </div>
//       </div>
//    );
// }

// export default SavedMovies;