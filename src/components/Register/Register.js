import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
    const handleRegister = (e) => {
        e.preventDefault();
    };

    return <AuthForm type='register' onSubmit={handleRegister} />;
}

export default Register;