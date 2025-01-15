import React from 'react';
import AulasAgendadas from '../components/aulasAgendadas'; // Certifique-se de que o caminho está correto

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Home</h1>
      <AulasAgendadas />
    </div>
  );
};

export default Home;
