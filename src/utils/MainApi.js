import Cookies from 'js-cookie';
import { BASE_URL } from './constants';

export default class MainApi {
   constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
   }

   _handleResponse(res) {
      if (!res.ok) {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
   }

   // Получение информации о пользователе
   getUserInfo() {
      const token = Cookies.get('jwt');
      return fetch(`${this._baseUrl}/users/me`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      }).then(this._handleResponse);
   }

   // Обновление профиля пользователя
   updateUserProfile({ name, email }) {
      const token = Cookies.get('jwt');
      return fetch(`${this._baseUrl}/users/me`, {
         method: "PATCH",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email }),
      }).then(this._handleResponse);
   }

   // Получение сохраненных фильмов пользователя
   getSavedMovies() {
      const token = Cookies.get('jwt');
      return fetch(`${this._baseUrl}/movies`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }).then(this._handleResponse);
   }

   // Сохранение нового фильма
   addMovie(movie) {
      const token = Cookies.get('jwt');
      return fetch(`${this._baseUrl}/movies`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(movie),
      }).then(this._handleResponse);
   }

   // Удаление сохраненного фильма
   removeMovie(movieId) {
      const token = Cookies.get('jwt');
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      }).then(this._handleResponse);
   }
}

export const mainApi = new MainApi({
   baseUrl: BASE_URL
});