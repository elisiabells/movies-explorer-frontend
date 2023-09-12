import { BASE_BEATFILMMOVIES_URL } from "./config";

export class MoviesApi {
   constructor(baseUrl) {
      this._baseUrl = baseUrl;
   }

   _handleResponse(res) {
      if (!res.ok) {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
   }

   getInitialMovies = () => {
      return fetch(`${this._baseUrl}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then(this._handleResponse);
   };
}

export const moviesApi = new MoviesApi(BASE_BEATFILMMOVIES_URL);