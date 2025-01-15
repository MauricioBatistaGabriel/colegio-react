// src/services/salaService.js
import axios from 'axios';
import { message } from 'antd'; // Importando o message

const API_URL = 'http://localhost:8080/api/sala';

export const criarSala = async (sala) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, sala, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const editarSala = async (id, sala) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, sala, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const excluirSala = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const listarSalas = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const listarSalasPorPeriodo = async (periodo) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL + "/byPeriodo/" + periodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error){
    return handleError(error);
  }
}

const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return { error: error.response.data.message }; // Retorna a mensagem de erro do servidor
  } else {
    return { error: 'Erro na aplicação' }; // Retorna erro genérico da aplicação
  }
};

export default {
  criarSala,
  editarSala,
  excluirSala,
  listarSalas,
};
