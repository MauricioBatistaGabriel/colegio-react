// src/pages/Sala/ListarSalas.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Breadcrumb } from 'antd';
import { listarSalas, excluirSala, editarSala } from '../../services/salaService';
import { Link } from 'react-router-dom';

const ListarSalas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSalas = async () => {
      setLoading(true);
      const result = await listarSalas();
      if (result.error) {
        message.warning(result.error); // Exibe a mensagem de erro do servidor em amarelo
      } else {
        setSalas(result);
      }
      setLoading(false);
    };

    fetchSalas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirSala(id);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setSalas(salas.filter(sala => sala.id !== id));
        message.success('Sala excluída com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir a sala.');
    }
  };

  const handleEdit = (record) => {
    setSelectedSala(record);
    form.setFieldsValue({ 
      nome: record.sala 
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSala(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        sala: values.nome
      };
      const result = await editarSala(selectedSala.id, payload);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setSalas(salas.map(sala => (sala.id === selectedSala.id ? { ...sala, ...values } : sala)));
        message.success('Sala atualizada com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar a sala.');
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sala',
      dataIndex: 'sala',
      key: 'sala',
    },
    {
      title: 'Períodos Disponíveis',
      dataIndex: 'periodosDisponiveis',
      key: 'periodosDisponiveis',
      render: (periodos) => (Array.isArray(periodos) ? periodos.join(', ') : ''),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta sala?"
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
    <>
        <h1>Salas</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Sala</Breadcrumb.Item>
      <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
            <Link to='/home'>
            <Button style={{marginBottom:'10px', marginRight:'10px'}}>Voltar Home</Button>
            </Link>
      <Link to='/sala/criar'>
      <Button style={{ backgroundColor: 'green', color: 'white', marginBottom:'10px'}}>Incluir</Button>
      </Link>
      <Table
        columns={columns}
        dataSource={salas}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Editar Sala"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Sala"
            rules={[{ required: true, message: 'Por favor, insira o nome da sala!' }]}
          >
            <Input placeholder="Nome da Sala" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarSalas;
