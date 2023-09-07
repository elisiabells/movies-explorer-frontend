import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin }) {
   return <AuthForm type='login' onSubmit={onLogin} />;
}

export default Login;