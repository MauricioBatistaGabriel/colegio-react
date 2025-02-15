import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const TurmaHome = () => {
  return (
    <div>
      <h1>Home - Turma</h1>
      <Link to="/turma/criar">
        <Button type="primary">Criar Turma</Button>
      </Link>
      <Link to="/turma/listar">
        <Button type="default">Listar Turmas</Button>
      </Link>
    </div>
  );
};

export default TurmaHome;
