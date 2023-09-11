import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, serverError, location }) {
    return <AuthForm type='register' onSubmit={onRegister} serverError={serverError} location={location} />;
}

export default Register;