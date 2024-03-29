import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/config';

function AuthForm({ type, onSubmit, serverError, setServerError }) {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isServerError, setIsServerError] = useState(false);
   const [userData, setUserData] = useState({
      name: { value: '', isValid: false, errorMessage: '' },
      email: { value: '', isValid: false, errorMessage: '' },
      password: { value: '', isValid: false, errorMessage: '' },
   });

   // Эффект для обработки ошибки сервера
   useEffect(() => {
      if (serverError) {
         setIsServerError(true);
      }
   }, [serverError]);

   // Проверка валидности формы
   const isFormValid =
      type === 'login'
         ? userData.email.isValid && userData.password.isValid
         : userData.name.isValid && userData.email.isValid && userData.password.isValid;

   const buttonDisabled = isSubmitting || !isFormValid || isServerError;

   // Обработчик изменения полей ввода
   const handleChange = (evt) => {
      const { name, value, validity, validationMessage } = evt.target;
      let isValidInput = validity.valid;
      let errorMessage = validationMessage;

      if (name === 'email' && !EMAIL_REGEX.test(value)) {
         isValidInput = false;
         errorMessage = 'Некорректный формат электронной почты';
      } else if (name === 'name' && !NAME_REGEX.test(value)) {
         isValidInput = false;
         errorMessage = 'Имя может содержать только латиницу, кириллицу, пробел или дефис';
      }

      setUserData((prevState) => ({
         ...prevState,
         [name]: { ...prevState[name], value, isValid: isValidInput, errorMessage },
      }));

      setIsServerError(false);
      setServerError('');
   };

   // Обработчик отправки формы
   const handleSubmit = (evt) => {
      evt.preventDefault();
      setIsSubmitting(true);
      onSubmit({
         name: userData.name.value,
         email: userData.email.value,
         password: userData.password.value,
      })
         .finally(() => {
            setIsSubmitting(false);
         });
   };

   return (
      <div className='auth-form'>
         <div className='auth-form__container'>
            <Link to='/'><img src={logo} alt='Логотип приложения' className='auth-form__logo' /></Link>
            <h2 className='auth-form__title'>
               {type === 'register' ? 'Добро пожаловать!' : 'Рады видеть!'}
            </h2>
            <form onSubmit={handleSubmit} className='auth-form__form-content'>
               {type === 'register' && (
                  <>
                     <label className='auth-form__label'>Имя</label>
                     <input
                        name="name"
                        className='auth-form__input'
                        type='text'
                        placeholder='Имя'
                        value={userData.name.value}
                        onChange={handleChange}
                        required
                     />
                     {userData.name.errorMessage && <span className='auth-form__error'>{userData.name.errorMessage}</span>}
                  </>
               )}
               <label className='auth-form__label'>E-mail</label>
               <input
                  name="email"
                  className='auth-form__input'
                  type='email'
                  placeholder='E-mail'
                  value={userData.email.value}
                  onChange={handleChange}
                  required
               />
               {userData.email.errorMessage && <span className="auth-form__error">{userData.email.errorMessage}</span>}
               <label className='auth-form__label'>Пароль</label>
               <input
                  name="password"
                  className='auth-form__input'
                  type='password'
                  placeholder='Пароль'
                  value={userData.password.value}
                  onChange={handleChange}
                  required
               />
               {userData.password.errorMessage && <span className="auth-form__error">{userData.password.errorMessage}</span>}
               <div className={`auth-form__sabmit-container ${type === 'login' ? 'auth-form__sabmit-container-login' : ''}`}>
                  {serverError && <p className="auth-form__error-server">{serverError}</p>}
                  <button
                     className='auth-form__button'
                     type='submit'
                     disabled={buttonDisabled}
                  >
                     {type === 'register' ? 'Зарегистрироваться' : 'Войти'}
                  </button>
               </div>
            </form>
            <p className='auth-form__footer-text'>
               {type === 'register' ? 'Уже зарегистрированы? ' : 'Ещё не зарегистрированы? '}
               <Link to={type === 'register' ? '/sign-in' : '/sign-up'} className='auth-form__link'>
                  {type === 'register' ? 'Войти' : 'Зарегистрироваться'}
               </Link>
            </p>
         </div>
      </div>
   );
}

export default AuthForm;