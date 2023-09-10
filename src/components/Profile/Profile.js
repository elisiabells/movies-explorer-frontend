import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onLogout, onUpdateProfile, serverError }) {
   const { currentUser } = useContext(CurrentUserContext);
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [isButtonActive, setIsButtonActive] = useState(false);
   const [nameError, setNameError] = useState('');
   const [emailError, setEmailError] = useState('');

   // Заполняем состояния name и email данными текущего пользователя
   useEffect(() => {
      if (currentUser) {
         setName(currentUser.name);
         setEmail(currentUser.email);
      }
   }, [currentUser]);

   // Проверяем валидность имени и электронной почты и активируем кнопку "Сохранить"
   useEffect(() => {
      // Регулярные выражения для валидации
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;

      const isNameValid = nameRegex.test(name);
      const isEmailValid = emailRegex.test(email);

      setNameError(isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис');
      setEmailError(isEmailValid ? '' : 'Некорректный формат электронной почты');

      setIsButtonActive(isNameValid && isEmailValid && (name !== currentUser.name || email !== currentUser.email));

   }, [name, email, currentUser.name, currentUser.email]);

   // Обработчики изменения имени и email в инпуте
   const handleNameChange = (event) => {
      setName(event.target.value);
   };

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   // Обработчики режима редактирования и сохранения изменений профиля
   const handleEdit = () => {
      setIsEditing(true);
   };

   const handleSave = () => {
      setIsEditing(false);
      onUpdateProfile({
         name,
         email
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