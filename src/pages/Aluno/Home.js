import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const AlunoHome = () => {
  return (
    <div>
      <h1>Home - Aluno</h1>
      <Link to="/aluno/criar">
        <Button type="primary">Criar Aluno</Button>
      </Link>
      <Link to="/aluno/listar">
        <Button type="default">Listar Alunos</Button>
      </Link>
    </div>
  );
};

export default AlunoHome;
