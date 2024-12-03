import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const ProfessorHome = () => {
  return (
    <div>
      <h1>Home - Professor</h1>
      <Link to="/professor/criar">
        <Button type="primary">Criar Professor</Button>
      </Link>
      <Link to="/professor/listar">
        <Button type="default">Listar Professores</Button>
      </Link>
    </div>
  );
};

export default ProfessorHome;
