// src/pages/Professor/ListarProfessor.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { listarProfessores, excluirProfessor } from '../../services/professorService';

const ListarProfessor = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfessores = async () => {
      setLoading(true);
      try {
        const data = await listarProfessores();
        setProfessores(data);
      } catch (error) {
        message.error('Falha ao carregar os professores.');
      }
      setLoading(false);
    };

    fetchProfessores();
  }, []);

  const handleDelete = async (id) => {
    try {
      await excluirProfessor(id);
      setProfessores(professores.filter(professor => professor.id !== id));
      message.success('Professor excluído com sucesso!');
    } catch (error) {
      message.error('Falha ao excluir o professor.');
    }
  };

  const handleEdit = (id) => {
    // Aqui você pode adicionar a lógica para redirecionar ou abrir um modal para editar o professor
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Períodos',
      dataIndex: 'periodos',
      key: 'periodos',
      render: (periodos) => periodos.join(', '),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record.id)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este professor?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>Excluir</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={professores}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ListarProfessor;
