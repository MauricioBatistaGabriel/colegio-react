import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const HoraAulaHome = () => {
  return (
    <div>
      <h1>Home - Hora Aula</h1>
      <Link to="/hora-aula/criar">
        <Button type="primary">Criar Hora Aula</Button>
      </Link>
      <Link to="/hora-aula/listar">
        <Button type="default">Listar Horas Aula</Button>
      </Link>
    </div>
  );
};

export default HoraAulaHome;
