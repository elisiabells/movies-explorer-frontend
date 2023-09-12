import { BASE_URL_MAIN } from "./config";

export class AuthApi {
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

   // Регистрация нового пользователя
   signup({ name, email, password }) {
      return fetch(`${this._baseUrl}/signup`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email, password }),
      }).then(this._handleResponse);
   }

   // Вход в систему
   signin(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password }),
      }).then(this._handleResponse);
   }

   // Проверка токена
   checkToken = (token) => {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         }
      }).then(this._handleResponse);
   }
}

export const authApi = new AuthApi(BASE_URL_MAIN);