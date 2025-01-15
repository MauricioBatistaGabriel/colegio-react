import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const SalaHome = () => {
  return (
    <div>
      <h1>Home - Sala</h1>
      <Link to="/sala/criar">
        <Button type="primary">Criar Sala</Button>
      </Link>
      <Link to="/sala/listar">
        <Button type="default">Listar Salas</Button>
      </Link>
    </div>
  );
};

export default SalaHome;
