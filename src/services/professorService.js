// src/services/professorService.js
import axios from 'axios';
import { message } from 'antd'; // Importando o message

const API_URL = 'http://localhost:8080/api/professor';

export const criarProfessor = async (professor) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, professor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const editarProfessor = async (id, professor) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, professor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const excluirProfessor = async (id) => {
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

export const listarProfessores = async () => {
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

export const listarMaterias = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/materia', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return { error: error.response.data.message }; // Retorna a mensagem de erro do servidor
  } else {
    return { error: 'Erro na aplicação' }; // Retorna erro genérico da aplicação
  }
};

export default {
  criarProfessor,
  editarProfessor,
  excluirProfessor,
  listarProfessores,
  listarMaterias,
};
