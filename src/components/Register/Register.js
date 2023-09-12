import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, serverError, location, setServerError }) {
    return <AuthForm
        type='register'
        onSubmit={onRegister}
        serverError={serverError}
        setServerError={setServerError}
        location={location} />;
}

export default Register;