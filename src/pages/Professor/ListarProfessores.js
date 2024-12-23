// src/pages/Professor/ListarProfessor.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Select } from 'antd';
import { listarProfessores, excluirProfessor, editarProfessor, listarMaterias } from '../../services/professorService';

const ListarProfessor = () => {
  const [professores, setProfessores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfessores = async () => {
      setLoading(true);
      const result = await listarProfessores();
      console.log("Professores carregados:", result); // Log dos dados dos professores
      if (result.error) {
        message.warning(result.error); // Exibe a mensagem de erro do servidor em amarelo
      } else {
        setProfessores(result);
      }
      setLoading(false);
    };

    const fetchMaterias = async () => {
      const result = await listarMaterias();
      if (result.error) {
        message.warning(result.error); // Exibe a mensagem de erro do servidor em amarelo
      } else {
        setMaterias(result);
      }
    };

    fetchProfessores();
    fetchMaterias();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirProfessor(id);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setProfessores(professores.filter(professor => professor.id !== id));
        message.success('Professor excluído com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir o professor.');
    }
  };

  const handleEdit = (record) => {
    setSelectedProfessor(record);
    form.setFieldsValue({ 
      nome: record.nome, 
      cpf: record.cpf, 
      periodosDeTrabalho: record.periodosDeTrabalho,
      materias: record.materias.map(materia => materia.id) // Seleciona as matérias pelo ID
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProfessor(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const materiasValidas = values.materias.filter(materiaId => materiaId !== undefined && materiaId !== null); // Filtra IDs de matéria vazios
      const payload = {
        nome: values.nome, 
        cpf: values.cpf, 
        periodosDeTrabalho: values.periodosDeTrabalho,
        materias: materiasValidas // Envia apenas os IDs das matérias
      };
      const result = await editarProfessor(selectedProfessor.id, payload);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setProfessores(professores.map(professor => (professor.id === selectedProfessor.id ? { ...professor, ...values, materias: result.materias } : professor)));
        message.success('Professor atualizado com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar o professor.');
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
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Períodos',
      dataIndex: 'periodosDeTrabalho',
      key: 'periodosDeTrabalho',
      render: (periodos) => (Array.isArray(periodos) ? periodos.join(', ') : ''),
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
    <>
      <Table
        columns={columns}
        dataSource={professores}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Editar Professor"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome do Professor"
            rules={[{ required: true, message: 'Por favor, insira o nome do professor!' }]}
          >
            <Input placeholder="Nome do Professor" />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF do Professor"
            rules={[{ required: true, message: 'Por favor, insira o CPF do professor!' }]}
          >
            <Input placeholder="CPF do Professor" />
          </Form.Item>
          <Form.Item
            name="periodosDeTrabalho"
            label="Períodos de Trabalho"
            rules={[{ required: true, message: 'Por favor, selecione os períodos de trabalho!' }]}
          >
            <Select mode="multiple" placeholder="Selecione os períodos">
              <Select.Option value="matutino">matutino</Select.Option>
              <Select.Option value="vespertino">vespertino</Select.Option>
              <Select.Option value="noturno">noturno</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="materias"
            label="Matérias"
            rules={[{ required: true, message: 'Por favor, selecione as matérias!' }]}
          >
            <Select mode="multiple" placeholder="Selecione as matérias">
              {materias.map((materia) => (
                <Select.Option key={materia.id} value={materia.id}>
                  {materia.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarProfessor;
