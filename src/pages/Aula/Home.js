// src/pages/Aula/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const AulaHome = () => {
  return (
    <div>
      <h1>Home - Aula</h1>
      <Link to="/aula/criar">
        <Button type="primary">Criar Aula</Button>
      </Link>
      <Link to="/aula/listar">
        <Button type="default">Listar Aulas</Button>
      </Link>
    </div>
  );
};

export default AulaHome;
