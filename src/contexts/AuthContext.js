import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuario/auth', { email, senha });
      const { token } = response.data;
      setAuthState({
        token,
        isAuthenticated: true,
      });
      localStorage.setItem('token', token);
      message.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login failed', error);
      message.error('Falha ao realizar o login.');
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

  const logout = async () => {
    try {
      const token = authState.token;
      await axios.post('http://localhost:8080/api/logout', {token}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      setAuthState({
        token: null,
        isAuthenticated: false,
      });
      message.success('Logout realizado com sucesso!');
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed', error);
      message.error('Erro na aplicação. Tente novamente.');
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };