import Cookies from 'js-cookie';
import { BASE_URL } from './constants';

export default class Auth {
   constructor() {
      this._handleResponse = this._handleResponse.bind(this);
   }

   _handleResponse(res) {
      if (!res.ok) {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
   }

   // Регистрация нового пользователя
   signup({ email, password, name }) {
      return fetch(`${BASE_URL}/signup`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password, name }),
      }).then(this._handleResponse);
   }

   // Вход пользователя
   signin({ email, password }) {
      return fetch(`${BASE_URL}/signin`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      }).then(this._handleResponse);
   }

   // Выход пользователя и удаление JWT из кук
   signout() {
      return fetch(`${BASE_URL}/signout`, {
         method: "POST",
      }).then(res => {
         Cookies.remove('jwt');
         return this._handleResponse(res);
      });
   }

   // Проверка Куки 
   checkCookie() {
      return fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      }).then(this._handleResponse);
   }

   checkToken(token) {
      return fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }).then(this._handleResponse);
   }
}