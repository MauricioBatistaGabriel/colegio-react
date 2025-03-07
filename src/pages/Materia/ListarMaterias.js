import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Breadcrumb, Card } from 'antd';
import { listarMaterias, excluirMateria, AtualizarMateria } from '../../services/materiaServices';
import { Link } from 'react-router-dom';
import { LeftOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

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
        message.warning(result.error);
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
        message.error(result.error);
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
        message.error(result.error);
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
      title: 'Cod',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Nome da Matéria',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: 'blue', marginRight: '10px', fontSize: '17px' }} type="link" onClick={() => handleEdit(record)}></EditOutlined>
          <Popconfirm
            title="Tem certeza que deseja excluir esta matéria?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '17px' }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>Matérias</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Materia</Breadcrumb.Item>
        <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
      <Link to='/home'>
        <Button style={{ marginBottom: '10px', marginRight: '10px' }}>
          <LeftOutlined />
          Voltar
        </Button>
      </Link>
      <Link to='/materia/criar'>
        <Button style={{ marginBottom: '10px' }}>
          <PlusCircleOutlined style={{ color: 'green' }} />Incluir
        </Button>
      </Link>
      <Card style={{ margin: 'auto', width: 'auto' }}>
        <Table
          columns={columns}
          dataSource={materias}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          tableLayout='auto'
        />
      </Card>
      <Modal
        title="Manutenção Matéria"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout={'vertical'}>
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