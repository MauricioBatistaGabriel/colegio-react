// src/services/alunoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aluno';

export const criarAluno = async (aluno) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, aluno, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const editarAluno = async (id, aluno) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, aluno, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error); // Retorna o erro para a chamada
  }
};

export const excluirAluno = async (id) => {
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

export const listarAlunos = async () => {
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

export const listarAlunoSemTurma = async () => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL + "/semTurma", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
} catch(error){
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
  criarAluno,
  editarAluno,
  excluirAluno,
  listarAlunos,
};
