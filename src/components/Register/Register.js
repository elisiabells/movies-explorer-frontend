import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
    return <AuthForm type='register' onSubmit={onRegister} />;
}

export default Register;