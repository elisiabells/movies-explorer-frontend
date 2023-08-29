import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Profile() {
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState('Виталий');
   const [email, setEmail] = useState('pochta@yandex.ru');

   const handleEdit = () => {
      setIsEditing(true);
   };

   const handleSave = () => {
      // здесь будет логика отправки данных на сервер
      setIsEditing(false);
   };

   const handleLogout = () => {
      // здесь будет логика для выхода из аккаунта
   };

   return (
      <section className='profile'>
         <Header />
         <h2 className='profile__title'> Привет, {name}!</h2>
         <form className='profile__form'>
            <div className='profile__form_item profile__form_name'>
               <label className='profile__form_label'>Имя</label>
               {isEditing ? (
                  <input
                     className='profile__form_input'
                     value={name}
                     onChange={e => setName(e.target.value)}
                  />
               ) : (
                  <span className='profile__form_input'>{name}</span>
               )}
            </div>
            <div className='profile__form_item'>
               <label className='profile__form_label'>E-mail</label>
               {isEditing ? (
                  <input
                     className='profile__form_input'
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
               ) : (
                  <span className='profile__form_input'>{email}</span>
               )}
            </div>
            {isEditing ? (
               <button onClick={handleSave} className='profile__form_button' type='button'>
                  Сохранить
               </button>
            ) : (
               <button onClick={handleEdit} className='profile__form_button' type='button'>
                  Редактировать
               </button>
            )}
         </form>
         <Link to='/' onClick={handleLogout} className='profile__button-exit' type='button'>
            Выйти из аккаунта
         </Link>
      </section>
   );
}

export default Profile;