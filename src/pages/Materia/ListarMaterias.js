// src/pages/Materia/ListarMaterias.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input } from 'antd';
import { listarMaterias, excluirMateria, AtualizarMateria } from '../../services/materiaServices';

const ListarMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchMaterias = async () => {
      setLoading(true);
      const result = await listarMaterias();
      if (result.error) {
        message.warning(result.error); // Exibe a mensagem de erro do servidor em amarelo
      } else {
        setMaterias(result);
      }
      setLoading(false);
    };

    fetchMaterias();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirMateria(id);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setMaterias(materias.filter(materia => materia.id !== id));
        message.success('Matéria excluída com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir a matéria.');
    }
  };

  const handleEdit = (record) => {
    setSelectedMateria(record);
    form.setFieldsValue({ nome: record.nome });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedMateria(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const result = await AtualizarMateria(selectedMateria.id, { nome: values.nome });
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setMaterias(materias.map(materia => (materia.id === selectedMateria.id ? { ...materia, nome: values.nome } : materia)));
        message.success('Matéria atualizada com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar a matéria');
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome da Matéria',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta matéria?"
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
      <Table
        columns={columns}
        dataSource={materias}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />
      <Modal
        title="Manutenção Matéria"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome da Matéria"
            rules={[{ required: true, message: 'Por favor, insira o nome da matéria!' }]}
          >
            <Input placeholder="Nome da Matéria" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarMaterias;
