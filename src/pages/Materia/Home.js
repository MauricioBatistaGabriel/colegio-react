// src/pages/Materia/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const MateriaHome = () => {
  return (
    <div>
      <h1>Home - Matéria</h1>
      <Link to="/materia/criar">
        <Button type="primary">Criar Matéria</Button>
      </Link>
      <Link to="/materia/listar">
        <Button type="default">Listar Matérias</Button>
      </Link>
    </div>
  );
};

export default MateriaHome;
