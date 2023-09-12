import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/config';

function Profile({ onLogout, onUpdateProfile, serverError, setServerError }) {
   const { currentUser } = useContext(CurrentUserContext);
   const [isEditing, setIsEditing] = useState(false); // Состояние редактирования профиля
   const [name, setName] = useState(''); // Имя пользователя
   const [email, setEmail] = useState(''); // Электронная почта пользователя
   const [isButtonActive, setIsButtonActive] = useState(false); // Активность кнопки "Сохранить"
   const [nameError, setNameError] = useState(''); // Ошибка валидации имени
   const [emailError, setEmailError] = useState(''); // Ошибка валидации email

   // Эффект для заполнения данных профиля при изменении currentUser
   useEffect(() => {
      if (currentUser) {
         setName(currentUser.name);
         setEmail(currentUser.email);
      }
   }, [currentUser]);

   // Эффект для сброса данных профиля к предыдущим значениям при наличии ошибки сервера
   useEffect(() => {
      if (serverError) {
         setName(currentUser.name);
         setEmail(currentUser.email);
      }
   }, [serverError, currentUser.name, currentUser.email]);

   // Эффект для валидации данных и активации кнопки "Сохранить"
   useEffect(() => {
      const isNameValid = NAME_REGEX.test(name);
      const isEmailValid = EMAIL_REGEX.test(email);

      // Установка ошибок валидации
      setNameError(isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис');
      setEmailError(isEmailValid ? '' : 'Некорректный формат электронной почты');

      // Проверка активации кнопки "Сохранить"
      setIsButtonActive(isNameValid && isEmailValid && (name !== currentUser.name || email !== currentUser.email) && !serverError);

   }, [name, email, currentUser.name, currentUser.email, serverError]);

   // Обработчик изменения имени пользователя
   const handleNameChange = (event) => {
      setName(event.target.value);
      setServerError('');
   };

   // Обработчик изменения email пользователя
   const handleEmailChange = (event) => {
      setEmail(event.target.value);
      setServerError('');
   };

   // Обработчик режима редактирования
   const handleEdit = () => {
      setIsEditing(true);
   };

   // Обработчик сохранения изменений профиля
   const handleSave = () => {
      onUpdateProfile({
         name,
         email
      })
         .then(() => {
            setIsEditing(false);
         });
   };

   return (
      <section className='profile'>
         <h2 className='profile__title'>Привет, {name}!</h2>
         <form className='profile__form' onSubmit={handleSave} noValidate>
            <div className='profile__form-item profile__name'>
               <label className='profile__label'>Имя</label>
               <input
                  className='profile__input'
                  name='name'
                  value={name}
                  onChange={handleNameChange}
                  required
                  minLength='2'
                  maxLength='30'
                  disabled={!isEditing}
               />
            </div>
            {nameError && <span className='profile__error'>{nameError}</span>}

            <div className='profile__form-item profile__email'>
               <label className='profile__label'>E-mail</label>
               <input
                  className='profile__input'
                  name='email'
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={!isEditing}
               />
            </div>
            {emailError && <span className='profile__error'>{emailError}</span>}
            {serverError && <span className='profile__server-error'>{serverError}</span>}

            {isEditing ? (
               <button className='profile__button profile__button-save' type='button' onClick={handleSave} disabled={!isButtonActive}>
                  Сохранить
               </button>
            ) : (
               <button className='profile__button' type='button' onClick={handleEdit}>
                  Редактировать
               </button>
            )}
         </form>
         <Link to='/' onClick={onLogout} className='profile__button-exit'>
            Выйти из аккаунта
         </Link>
      </section>
   );
}

export default Profile;