// src/pages/Turma/ListarTurmas.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Select, Breadcrumb } from 'antd';
import { listarTurmas, excluirTurma, editarTurma, listarSalas, listarMaterias } from '../../services/turmaService';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const turmasData = await listarTurmas();
        setTurmas(turmasData);

        const salasData = await listarSalas();
        setSalas(salasData);

        const materiasData = await listarMaterias();
        setMaterias(materiasData);
      } catch (error) {
        message.error('Falha ao carregar os dados.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirTurma(id);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setTurmas(turmas.filter(turma => turma.id !== id));
        message.success('Turma excluída com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir a turma.');
    }
  };

  const handleEdit = (record) => {
    setSelectedTurma(record);
    form.setFieldsValue({
      nome: record.nome,
      sala: record.sala.id, // Usando o ID da sala
      periodo: record.periodo,
      materias: record.materias.map(materia => materia.id),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTurma(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        nome: values.nome,
        sala: values.sala,
        periodo: values.periodo,
        materias: values.materias,
      };
      const result = await editarTurma(selectedTurma.id, payload);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        const updatedTurmas = await listarTurmas(); // Atualiza a lista de turmas após a edição
        setTurmas(updatedTurmas);
        message.success('Turma atualizada com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar a turma.');
    }
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
      title: 'Período',
      dataIndex: 'periodo',
      key: 'periodo',
    },
    {
      title: 'Sala',
      dataIndex: 'sala',
      key: 'sala',
      render: (sala) => sala.sala, // Exibindo o nome da sala
    },
    {
      title: 'Matérias',
      dataIndex: 'materias',
      key: 'materias',
      render: (materias) => (Array.isArray(materias) ? materias.map(m => m.nome).join(', ') : ''),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta turma?"
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
    <h1>Turmas</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Turma</Breadcrumb.Item>
      <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
      <Link to='/home'>
      <Button style={{marginBottom:'10px', marginRight:'10px'}}>Voltar Home</Button>
      </Link>
      <Link to='/turma/criar'>
      <Button style={{ backgroundColor: 'green', color: 'white', marginBottom:'10px'}}>Incluir</Button>
      </Link>
      <Table
        columns={columns}
        dataSource={turmas}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Editar Turma"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome da Turma"
            rules={[{ required: true, message: 'Por favor, insira o nome da turma!' }]}
          >
            <Input placeholder="Nome da Turma" />
          </Form.Item>
          <Form.Item
            name="sala"
            label="Sala"
            rules={[{ required: true, message: 'Por favor, selecione a sala!' }]}
          >
            <Select placeholder="Selecione a sala" style={{ width: '100%' }}>
              {salas.map(sala => (
                <Option key={sala.id} value={sala.id}>
                  {sala.sala}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="periodo"
            label="Período"
            rules={[{ required: true, message: 'Por favor, selecione um período!' }]}
          >
            <Select placeholder="Selecione o período" style={{ width: '100%' }}>
              <Option value="matutino">Matutino</Option>
              <Option value="vespertino">Vespertino</Option>
              <Option value="noturno">Noturno</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="materias"
            label="Matérias"
            rules={[{ required: true, message: 'Por favor, selecione ao menos uma matéria!' }]}
          >
            <Select mode="multiple" placeholder="Selecione as matérias" style={{ width: '100%' }}>
              {materias.map((materia) => (
                <Option key={materia.id} value={materia.id}>
                  {materia.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarTurmas;
