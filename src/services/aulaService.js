import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aula';

export const listarAulas = async () => {
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

export const criarAula = async (aula) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      data: aula.data, // String no formato "YYYY-MM-DD"
      professor: aula.professor, // ID do professor
      materia: aula.materia, // ID da matéria
      turma: aula.turma, // ID da turma
      horaaula: aula.horaaula, // ID da hora aula
    };
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const editarAula = async (id, aula) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      data: aula.data, // String no formato "YYYY-MM-DD"
      professor: aula.professor, // ID do professor
      materia: aula.materia, // ID da matéria
      turma: aula.turma, // ID da turma
      horaaula: aula.horaaula, // ID da hora aula
    };
    const response = await axios.put(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const excluirAula = async (id) => {
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
    const response = await axios.get('http://localhost:8080/api/professor', {
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

export const listarTurmas = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/turma', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const listarHorasAula = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/horaaula', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return { error: error.response.data.message };
  } else {
    return { error: 'Erro na aplicação' };
  }
};

export default {
  listarAulas,
  criarAula,
  editarAula,
  excluirAula,
  listarProfessores,
  listarMaterias,
  listarTurmas,
  listarHorasAula,
};