// src/services/horaAulaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/horaaula';

export const listarHorasAula = async () => {
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

export const listarHorasAulaByTurma = async (id) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL + "/byTurma/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    return handleError(error);
  }
}

export const criarHoraAula = async (horaAula) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, horaAula, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const editarHoraAula = async (id, horaAula) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, horaAula, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const excluirHoraAula = async (id) => {
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

const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return { error: error.response.data.message }; // Retorna a mensagem de erro do servidor
  } else {
    return { error: 'Erro na aplicação' }; // Retorna erro genérico da aplicação
  }
};

export default {
  listarHorasAula,
  listarHorasAulaByTurma,
  criarHoraAula,
  editarHoraAula,
  excluirHoraAula,
};
