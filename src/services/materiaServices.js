// src/services/materiaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/materia';

export const criarMateria = async (materia) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, materia, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarMaterias = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const excluirMateria = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const AtualizarMateria = async (id, materia) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/${id}`, { nome:materia.nome }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
