import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Select, Breadcrumb, Card } from 'antd';
import { listarProfessores, excluirProfessor, editarProfessor, listarMaterias } from '../../services/professorService';
import { Link } from 'react-router-dom';
import { LeftOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

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
      console.log("Professores carregados:", result);
      if (result.error) {
        message.warning(result.error);
      } else {
        setProfessores(result);
      }
      setLoading(false);
    };

    const fetchMaterias = async () => {
      const result = await listarMaterias();
      if (result.error) {
        message.warning(result.error);
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
        message.error(result.error);
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
      materias: record.materias.map(materia => materia.id)
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
        materias: materiasValidas
      };
      const result = await editarProfessor(selectedProfessor.id, payload);
      if (result && result.error) {
        message.error(result.error);
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
      title: 'Cod',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'center',
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
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: 'blue', marginRight: '10px', fontSize: '17px' }} type="link" onClick={() => handleEdit(record)}></EditOutlined>
          <Popconfirm
            title="Tem certeza que deseja excluir este professor?"
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
      <h1>Professores</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Professor</Breadcrumb.Item>
        <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
      <Link to='/home'>
        <Button style={{ marginBottom: '10px', marginRight: '10px' }}>
          <LeftOutlined />
          Voltar
        </Button>
      </Link>
      <Link to='/professor/criar'>
        <Button style={{ marginBottom: '10px' }}>
          <PlusCircleOutlined style={{ color: 'green' }} />Incluir
        </Button>
      </Link>
      <Card style={{ margin: 'auto', width: 'auto' }}>
        <Table
          columns={columns}
          dataSource={professores}
          loading={loading}
          rowKey={record => record.id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
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