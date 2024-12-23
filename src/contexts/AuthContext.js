// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
  });

  const login = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuario/auth', { email, senha });
      const { token } = response.data;
      setAuthState({
        token,
        isAuthenticated: true,
      });
      localStorage.setItem('token', token); // Salva o token no localStorage
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuario', { email, senha });
      console.log(response.data);
      message.success('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Signup failed', error);
      message.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
