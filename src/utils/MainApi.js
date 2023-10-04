import { BASE_URL_MAIN } from "./config";

export class MainApi {
   constructor(baseUrl) {
      this._baseUrl = baseUrl;
   }

   _handleResponse(res) {
      if (!res.ok) {
         return res.json().then((data) => {
            const error = new Error(data.message || 'Что-то пошло не так.');
            error.data = data;
            throw error;
         });
      }
      return res.json();
   }

   // Получение информации о текущем пользователе
   getCurrentUser() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         })
   }

   // Обновление профиля текущего пользователя
   updateUser({ email, name }) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
         body: JSON.stringify({ email, name }),
      }).then(this._handleResponse);
   }

   // Получение списка сохраненных пользователем фильмов
   getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
      }).then(this._handleResponse);
   }

   // Добавление нового фильма в список сохраненных
   savedMovie(movie) {
      const baseMovieUrl = 'https://api.nomoreparties.co';
      return fetch(`${this._baseUrl}/movies`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
         body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${baseMovieUrl}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `${baseMovieUrl}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
         }),
      }).then(this._handleResponse);
   }

   // Удаление фильма из списка сохраненных
   removeMovie(movieId) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         },
      }).then(this._handleResponse);
   }
}

export const mainApi = new MainApi(BASE_URL_MAIN);