import axios from 'axios';

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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
  }
};

export const listarProfessoresByFilter = async (filterProfessor) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL + "/listarProfessorByMateriaAndHoraAulaAndData", filterProfessor, {
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
    return { error: error.response.data.message };
  } else {
    return { error: 'Erro na aplicação' };
  }
};

export default {
  criarProfessor,
  editarProfessor,
  excluirProfessor,
  listarProfessores,
  listarMaterias,
};