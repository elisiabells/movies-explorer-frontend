import React from 'react';
import NavTab from '../NavTab/NavTab';

function Promo() {
    return (
        <section className="promo">
            <img src="/path-to-small-logo.svg" alt="Маленькое лого" className="promo__logo" />
            <div className="promo__actions">
                <button className="promo__register-btn">Регистрация</button>
                <button className="promo__login-btn">Войти</button>
            </div>
            <img src="/path-to-big-logo.svg" alt="Абложка" className="promo__cover-logo" />
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab />
        </section>
    );
}

export default Promo;
