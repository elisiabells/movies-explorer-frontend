import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// function Profile({ onLogout, onUpdateProfile }) {
// // // //    const { currentUser } = useContext(CurrentUserContext);

// // // //     const [name, setName] = useState('');
// // // //     const [email, setEmail] = useState('');
// // // //     const [isEdited, setIsEdited] = useState(false);

// // // //     useEffect(() => {
// // // //         if (currentUser) {
// // // //             setName(currentUser.name);
// // // //             setEmail(currentUser.email);
// // // //         }
// // // //     }, [currentUser]);

// // // //    // Регулярные выражения для валидации
// // // //    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// // // //    const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;

// // // //    

// // // //    const [disabled, setDisabled] = useState(true);

// // // //    const handleChange = (evt) => {
// // // //       const { name, value, validity, validationMessage } = evt.target;

// // // //       let isValid = validity.valid;
// // // //       let errorMessage = validationMessage;

// // // //       if (name === "email" && !emailRegex.test(value)) {
// // // //          isValid = false;
// // // //          errorMessage = "Некорректный формат электронной почты";
// // // //       } else if (name === "name" && !nameRegex.test(value)) {
// // // //          isValid = false;
// // // //          errorMessage = "Имя может содержать только латиницу, кириллицу, пробел или дефис";
// // // //       }

// // // //       setUserData((prevState) => ({
// // // //          ...prevState,
// // // //          [name]: {
// // // //             ...userData[name],
// // // //             value,
// // // //             isValid,
// // // //             errorMessage
// // // //          }
// // // //       }));
// // // //    };

// // // //    // Управление кнопкой "Редактировать"
// // // //    useEffect(() => {
// // // //       if (currentUser.name === userData.name.value && currentUser.email === userData.email.value) {
// // // //          setDisabled(true);
// // // //       } else if (userData.name.isValid && userData.email.isValid) {
// // // //          setDisabled(false);
// // // //       } else {
// // // //          setDisabled(true);
// // // //       }
// // // //    }, [currentUser, userData]);

// // // //    const handleSubmit = (evt) => {
// // // //       evt.preventDefault();
// // // //       onUpdateProfile({
// // // //          name: userData.name.value,
// // // //          email: userData.email.value
// // // //       });
// // // //    };

// // // //    return (
// // // //       <section className='profile'>
// // // //          <h2 className='profile__title'> Привет, {currentUser.name}!</h2>
// // // //          <form className='profile__form' onSubmit={handleSubmit} noValidate>
// // // //             <div className='profile__form-item profile__name'>
// // // //                <label className='profile__label'>Имя</label>
// // // //                <input
// // // //                   className='profile__input'
// // // //                   name='name'
// // // //                   value={name}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   minLength='2'
// // // //                   maxLength='30'
// // // //                />
// // // //                <span className='auth-form__error'>
// // // //                   {userData.name.errorMessage}
// // // //                </span>
// // // //             </div>
// // // //             <div className='profile__form-item profile__email'>
// // // //                <label className='profile__label'>E-mail</label>
// // // //                <input
// // // //                   className='profile__input'
// // // //                   name='email'
// // // //                   type='email'
// // // //                   required
// // // //                   value={email}
// // // //                   onChange={handleChange}
// // // //                />
// // // //                <span className='auth-form__error'>
// // // //                   {userData.email.errorMessage}
// // // //                </span>
// // // //             </div>
// // // //             <button
// // // //                className={`profile__button ${!disabled ? 'profile__button-save' : ''}`}
// // // //                type='submit'
// // // //                disabled={disabled}
// // // //             >
// // // //                Редактировать
// // // //             </button>
// // // //          </form>
// // // //          <Link to='/' onClick={onLogout} className='profile__button-exit'>
// // // //             Выйти из аккаунта
// // // //          </Link>
// // // //       </section>
// // // //    );
// // // // }

// // // // export default Profile;

// // // // import React, { useState, useEffect, useContext } from 'react';
// // // // import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// // // // function Profile({ onLogout, onUpdateProfile }) {
// // // //     const { currentUser } = useContext(CurrentUserContext);

// // // //     const [name, setName] = useState('');
// // // //     const [email, setEmail] = useState('');

// // // //     useEffect(() => {
// // // //         if (currentUser) {
// // // //             setName(currentUser.name);
// // // //             setEmail(currentUser.email);
// // // //         }
// // // //     }, [currentUser]);

// // // //     const handleNameChange = (event) => {
// // // //         setName(event.target.value);
// // // //     };

// // // //     const handleEmailChange = (event) => {
// // // //         setEmail(event.target.value);
// // // //     };


// // // //     const handleSubmit = (event) => {
// // // //         event.preventDefault();
// // // //         onUpdateProfile({
// // // //             name,
// // // //             email
// // // //         });
// // // //     };

// // // //     return (
// // // //         <div className="profile">
// // // //             <form onSubmit={handleSubmit}>
// // // //                 <label>
// // // //                     Имя
// // // //                     <input type="text" value={name} onChange={handleNameChange} />
// // // //                 </label>
// // // //                 <label>
// // // //                     Email
// // // //                     <input type="email" value={email} onChange={handleEmailChange} />
// // // //                 </label>
// // // //                 <button type="submit">
// // // //                     Сохранить
// // // //                 </button>
// // // //             </form>
// // // //             <button onClick={onLogout}>
// // // //                 Выйти из аккаунта
// // // //             </button>
// // // //         </div>
// // // //     );
// // // // }
// // // // export default Profile;


// // // //Отображает данные, но нет валидации и кнопка не работает. 
// // // // function Profile({ onLogout, onUpdateProfile }) {
// // // //    const { currentUser } = useContext(CurrentUserContext);

// // // //    const [name, setName] = useState('');
// // // //    const [email, setEmail] = useState('');

// // // //    useEffect(() => {
// // // //        if (currentUser) {
// // // //            setName(currentUser.name);
// // // //            setEmail(currentUser.email);
// // // //        }
// // // //    }, [currentUser]);

// // // //    const handleNameChange = (event) => {
// // // //        setName(event.target.value);
// // // //    };

// // // //    const handleEmailChange = (event) => {
// // // //        setEmail(event.target.value);
// // // //    };

// // // //    const handleSubmit = (event) => {
// // // //        event.preventDefault();
// // // //        onUpdateProfile({
// // // //            name,
// // // //            email
// // // //        });
// // // //    };

// // // //    return (
// // // //        <section className='profile'>
// // // //            <h2 className='profile__title'> Привет, {name}!</h2>
// // // //            <form className='profile__form' onSubmit={handleSubmit} noValidate>
// // // //                <div className='profile__form-item profile__name'>
// // // //                    <label className='profile__label'>Имя</label>
// // // //                    <input
// // // //                        className='profile__input'
// // // //                        name='name'
// // // //                        value={name}
// // // //                        onChange={handleNameChange}
// // // //                        required
// // // //                        minLength='2'
// // // //                        maxLength='30'
// // // //                    />
// // // //                </div>
// // // //                <div className='profile__form-item profile__email'>
// // // //                    <label className='profile__label'>E-mail</label>
// // // //                    <input
// // // //                        className='profile__input'
// // // //                        name='email'
// // // //                        type='email'
// // // //                        value={email}
// // // //                        onChange={handleEmailChange}
// // // //                        required
// // // //                    />
// // // //                </div>
// // // //                <button className='profile__button' type='submit'>
// // // //                    Редактировать
// // // //                </button>
// // // //            </form>
// // // //            <Link to='/' onClick={onLogout} className='profile__button-exit'>
// // // //                Выйти из аккаунта
// // // //            </Link>
// // // //        </section>
// // // //    );
// // // // }

// // // // export default Profile;



// // // //Валидация и данные, но после повторного входа ничего нет
// // // function Profile({ onLogout, onUpdateProfile }) {
// // //    const { currentUser } = useContext(CurrentUserContext);

// //    const [name, setName] = useState('');
// //    const [email, setEmail] = useState('');

// // //    const [isButtonActive, setIsButtonActive] = useState(false);


// //    // Регулярные выражения для валидации
// //    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// //    const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;

// //    // Состояние ошибок для полей ввода
// //    const [nameError, setNameError] = useState('');
// //    const [emailError, setEmailError] = useState('');

// // //    useEffect(() => {
// // //       if (currentUser) {
// // //          setName(currentUser.name);
// // //          setEmail(currentUser.email);
// // //       }
// // //    }, [currentUser]);

// //    const handleNameChange = (event) => {
// //       setName(event.target.value);

// //       // Валидация имени
// //       if (!nameRegex.test(event.target.value)) {
// //          setNameError("Имя может содержать только латиницу, кириллицу, пробел или дефис");
// //       } else {
// //          setNameError("");
// //       }
// //    };

// // // //    const handleEmailChange = (event) => {
// // // //       setEmail(event.target.value);

// // // //       // Валидация email
// // // //       if (!emailRegex.test(event.target.value)) {
// // // //          setEmailError("Некорректный формат электронной почты");
// // // //       } else {
// // // //          setEmailError("");
// // // //       }
// // // //    };

// // //    const validateButton = () => {
// // //       setIsButtonActive(
// // //           !nameError && !emailError && (name !== currentUser.name || email !== currentUser.email)
// // //       );
// // //   };

// // //   const handleNameChange = (event) => {
// // //       setName(event.target.value);
// // //       if (!nameRegex.test(event.target.value)) {
// // //           setNameError("Имя может содержать только латиницу, кириллицу, пробел или дефис");
// // //       } else {
// // //           setNameError("");
// // //       }
// // //       validateButton();
// // //   };

// // //   const handleEmailChange = (event) => {
// // //       setEmail(event.target.value);
// // //       if (!emailRegex.test(event.target.value)) {
// // //           setEmailError("Некорректный формат электронной почты");
// // //       } else {
// // //           setEmailError("");
// // //       }
// // //       validateButton();
// // //   };


// // //    const handleSubmit = (event) => {
// // //       event.preventDefault();
// // //       if (!nameError && !emailError) {
// // //          onUpdateProfile({
// // //             name,
// // //             email
// // //          });
// // //       }
// // //    };

// // //    const [isEditing, setIsEditing] = useState(false);
// // //    const handleEdit = () => {
// // //       setIsEditing(true);
// // //    };

// // //    const handleSave = () => {
// // //       if (isButtonActive) {
// // //          onUpdateProfile({
// // //             name,
// // //             email
// // //          });
// // //          setIsEditing(false);
// // //       }
// // //    };


// // //    return (
// // //       <section className='profile'>
// // //          <h2 className='profile__title'> Привет, {name}!</h2>
// // //          <form className='profile__form' onSubmit={handleSubmit} noValidate>
// // //             <div className='profile__form-item profile__name'>
// // //                <label className='profile__label'>Имя</label>
// // //                <input
// // //                   className='profile__input'
// // //                   name='name'
// // //                   value={name}
// // //                   onChange={handleNameChange}
// // //                   required
// // //                   minLength='2'
// // //                   maxLength='30'
// // //                />
// // //                <span className='auth-form__error'>
// // //                   {nameError}
// // //                </span>
// // //             </div>
// // //             <div className='profile__form-item profile__email'>
// // //                <label className='profile__label'>E-mail</label>
// // //                <input
// // //                   className='profile__input'
// // //                   name='email'
// // //                   type='email'
// // //                   value={email}
// // //                   onChange={handleEmailChange}
// // //                   required
// // //                />
// // //                <span className='auth-form__error'>
// // //                   {emailError}
// // //                </span>
// // //             </div>
// // //             {isEditing ? (
// // //                <button onClick={handleSave} className='profile__button profile__button-save' type="button" disabled={!isButtonActive}>
// // //                   Сохранить
// // //                </button>

// // //             ) : (
// // //                <button onClick={handleEdit} className='profile__button' type="button">
// // //                   Редактировать
// // //                </button>
// // //             )}
// // //          </form>
// // //          <Link to='/' onClick={onLogout} className='profile__button-exit'>
// // //             Выйти из аккаунта
// // //          </Link>
// // //       </section>
// // //    );
// // // }

// // // export default Profile;


// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { Link } from 'react-router-dom';


// // // function Profile({ onLogout, onUpdateProfile }) {
// // //    const { currentUser } = useContext(CurrentUserContext);
// // //    const [isEditing, setIsEditing] = useState(false);
// // //    const [name, setName] = useState('');
// // //    const [email, setEmail] = useState('');
// // //    const [isButtonActive, setIsButtonActive] = useState(false);

// // //    useEffect(() => {
// // //       if (currentUser) {
// // //          setName(currentUser.name);
// // //          setEmail(currentUser.email);
// // //       }
// // //    }, [currentUser]);


// // //    const handleNameChange = (event) => {
// // //       setName(event.target.value);
// // //    };

// // //    const handleEmailChange = (event) => {
// // //       setEmail(event.target.value);
// // //    };

// // //    const handleEdit = () => {
// // //       setIsEditing(true);
// // //    };

// // //    const handleSave = () => {
// // //       setIsEditing(false);
// // //       onUpdateProfile({
// // //          name,
// // //          email
// // //       });
// // //    };


// // //    return (
// // //       <section className='profile'>
// // //          <h2 className='profile__title'> Привет, {name}!</h2>
// // //          <form className='profile__form' onSubmit={handleSave} noValidate>
// // //             <div className='profile__form-item profile__name'>
// // //                <label className='profile__label'>Имя</label>
// // //                <input
// // //                   className='profile__input'
// // //                   name='name'
// // //                   value={name}
// // //                   onChange={handleNameChange}
// // //                   required
// // //                   minLength='2'
// // //                   maxLength='30'
// // //                   disabled={!isEditing}
// // //                />
// // //             </div>
// // //             <div className='profile__form-item profile__email'>
// // //                <label className='profile__label'>E-mail</label>
// // //                <input
// // //                   className='profile__input'
// // //                   name='email'
// // //                   type='email'
// // //                   value={email}
// // //                   onChange={handleEmailChange}
// // //                   required
// // //                   disabled={!isEditing}
// // //                />
// // //             </div>
// // //             {isEditing ? (
// // //                <button onClick={handleSave} className='profile__button profile__button-save' type="button">
// // //                   Сохранить
// // //                </button>
// // //             ) : (
// // //                <button onClick={handleEdit} className='profile__button' type="button">
// // //                   Редактировать
// // //                </button>
// // //             )}
// // //          </form>
// // //          <Link to='/' onClick={onLogout} className='profile__button-exit'>
// // //             Выйти из аккаунта
// // //          </Link>
// // //       </section>
// // //    );
// // // }

// // // export default Profile;
// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';

// function Profile({ onLogout, onUpdateProfile }) {
//    const { currentUser } = useContext(CurrentUserContext);
//    const [isEditing, setIsEditing] = useState(false);

//    const [name, setName] = useState('');
//    const [email, setEmail] = useState('');

//    // Состояние для валидации
//    const [userData, setUserData] = useState({
//       name: {
//          value: '',
//          isValid: false,
//          errorMessage: ''
//       },
//       email: {
//          value: '',
//          isValid: false,
//          errorMessage: ''
//       }
//    });

//    // Регулярные выражения для валидации
//    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//    const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;

//    const handleChange = (evt) => {
//       const { name, value, validity, validationMessage } = evt.target;

//       let isValid = validity.valid;
//       let errorMessage = validationMessage;

//       if (name === "email" && !emailRegex.test(value)) {
//          isValid = false;
//          errorMessage = "Некорректный формат электронной почты";
//       } else if (name === "name" && !nameRegex.test(value)) {
//          isValid = false;
//          errorMessage = "Имя может содержать только латиницу, кириллицу, пробел или дефис";
//       }

//       setUserData((prevState) => ({
//          ...prevState,
//          [name]: {
//             ...prevState[name],
//             value,
//             isValid,
//             errorMessage
//          }
//       }));
//    };

//    useEffect(() => {
//       if (currentUser) {
//          setName(currentUser.name);
//          setEmail(currentUser.email);
//       }
//    }, [currentUser]);

//    // Отслеживание валидности формы для активации кнопки
//    const isButtonActive = userData.name.isValid && userData.email.isValid;

//    const handleEdit = () => {
//       setIsEditing(true);
//    };

//    const handleSave = () => {
//       setIsEditing(false);
//       onUpdateProfile({
//          name: userData.name.value,
//          email: userData.email.value
//       });
//    };

//    return (
//       <section className='profile'>
//          <h2 className='profile__title'> Привет, {userData.name.value}!</h2>
//          <form className='profile__form' onSubmit={handleSave} noValidate>
//             <div className='profile__form-item profile__name'>
//                <label className='profile__label'>Имя</label>
//                <input
//                   className='profile__input'
//                   name='name'
//                   value={userData.name.value}
//                   onChange={handleChange}
//                   required
//                   minLength='2'
//                   maxLength='30'
//                   disabled={!isEditing}
//                />
//                <span className='profile__error-message'>{userData.name.errorMessage}</span>
//             </div>
//             <div className='profile__form-item profile__email'>
//                <label className='profile__label'>E-mail</label>
//                <input
//                   className='profile__input'
//                   name='email'
//                   type='email'
//                   value={userData.email.value}
//                   onChange={handleChange}
//                   required
//                   disabled={!isEditing}
//                />
//                <span className='profile__error-message'>{userData.email.errorMessage}</span>
//             </div>
//             {isEditing ? (
//                <button
//                   onClick={handleSave}
//                   className='profile__button profile__button-save'
//                   type="button"
//                   disabled={!isButtonActive}
//                >
//                   Сохранить
//                </button>
//             ) : (
//                <button onClick={handleEdit} className='profile__button' type="button">
//                   Редактировать
//                </button>
//             )}
//          </form>
//          <Link to='/' onClick={onLogout} className='profile__button-exit'>
//             Выйти из аккаунта
//          </Link>
//       </section>
//    );
// }

// export default Profile;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;

function Profile({ onLogout, onUpdateProfile }) {
   const { currentUser } = useContext(CurrentUserContext);
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [isButtonActive, setIsButtonActive] = useState(false);
   const [nameError, setNameError] = useState('');
   const [emailError, setEmailError] = useState('');

   useEffect(() => {
      if (currentUser) {
         setName(currentUser.name);
         setEmail(currentUser.email);
      }
   }, [currentUser]);

   useEffect(() => {
      const isNameValid = nameRegex.test(name);
      const isEmailValid = emailRegex.test(email);

      setNameError(isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис');
      setEmailError(isEmailValid ? '' : 'Некорректный формат электронной почты');

      setIsButtonActive(isNameValid && isEmailValid && (name !== currentUser.name || email !== currentUser.email));

   }, [name, email, currentUser.name, currentUser.email]);

   const handleNameChange = (event) => {
      setName(event.target.value);
   };

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

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
            {nameError && <span className="profile__error">{nameError}</span>}
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
            {emailError && <span className="profile__error">{emailError}</span>}
            {isEditing ? (
               <button onClick={handleSave} className='profile__button profile__button-save' type="button" disabled={!isButtonActive}>
                  Сохранить
               </button>
            ) : (
               <button onClick={handleEdit} className='profile__button' type="button">
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