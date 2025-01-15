import React, { useState, useEffect } from 'react';
import { Card, Carousel, message } from 'antd';
import { listarAulas } from '../services/aulaService';
import './AulasAgendadas.css';

const { Meta } = Card;

const AulasAgendadas = () => {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const result = await listarAulas();
        setAulas(result);
      } catch (error) {
        message.error('Falha ao carregar as aulas.');
      }
    };
    fetchAulas();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Carousel {...settings}>
      {aulas.map(aula => (
        <Card
          key={aula.id}
          title={`Aula ${aula.id}`}
          hoverable
        >
          <Meta
            title={`${aula.materia.nome} com ${aula.professor.nome}`}
            description={
              <>
                <p><strong>Turma:</strong> {aula.turma.nome}</p>
                <p><strong>Sala:</strong> {aula.turma.sala.sala}</p>
                <p><strong>Data:</strong> {aula.data}</p>
                <p><strong>Hora:</strong> {aula.horaaula.horaInicial} - {aula.horaaula.horaFinal}</p>
              </>
            }
          />
        </Card>
      ))}
    </Carousel>
  );
};

export default AulasAgendadas;
