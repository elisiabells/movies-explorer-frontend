export default function filterMovies(movies, query, showShortMovies) {
   let filteredMovies = movies.filter(movie => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN ? movie.nameEN.toLowerCase() : "";
      return movieNameRU.includes(query.toLowerCase()) || movieNameEN.includes(query.toLowerCase());
   });

   if (showShortMovies) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
   }

   return filteredMovies;
}
// export function searchMovies(movies, query, showShortMovies = false) {
//    if (!query) return movies;  // Если запроса нет, возвращаем все фильмы.

//    const lowercaseQuery = query.toLowerCase();

//    const filteredMovies = movies.filter(movie => {
//       const movieNameRU = movie.nameRU.toLowerCase();
//       const movieNameEN = movie.nameEN ? movie.nameEN.toLowerCase() : "";
//       return movieNameRU.includes(lowercaseQuery) || movieNameEN.includes(lowercaseQuery);
//    });

//    if (showShortMovies) {
//       return filteredMovies.filter(movie => movie.duration <= 40);
//    }

//    return filteredMovies;
// }
