import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, Breadcrumb, Card } from 'antd';
import { listarAlunos, excluirAluno, editarAluno } from '../../services/alunoService';
import { LeftOutlined , DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ListarAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      const result = await listarAlunos();
      console.log("Alunos carregados:", result);
      if (result.error) {
        message.warning(result.error);
      } else {
        setAlunos(result);
      }
      setLoading(false);
    };

    fetchAlunos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirAluno(id);
      if (result && result.error) {
        message.error(result.error);
      } else {
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        message.success('Aluno excluído com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir o aluno.');
    }
  };

  const handleEdit = (record) => {
    setSelectedAluno(record);
    form.setFieldsValue({ 
      nome: record.nome, 
      cpf: record.cpf, 
      idade: record.idade 
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAluno(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        nome: values.nome, 
        cpf: values.cpf, 
        idade: values.idade
      };
      const result = await editarAluno(selectedAluno.id, payload);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setAlunos(alunos.map(aluno => (aluno.id === selectedAluno.id ? { ...aluno, ...values } : aluno)));
        message.success('Aluno atualizado com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar o aluno.');
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
      title: 'Idade',
      dataIndex: 'idade',
      key: 'idade',
    },
    {
      title: 'Turma',
      dataIndex: 'turma',
      key: 'turma',
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <span>
          <EditOutlined style={{color:'blue', marginRight:'10px', fontSize:'17px'}} type="link" onClick={() => handleEdit(record)}></EditOutlined>
          <Popconfirm
            title="Tem certeza que deseja excluir este aluno?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <DeleteOutlined style={{color:'red', fontSize:'17px'}} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>Alunos</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Aluno</Breadcrumb.Item>
        <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
      <Link to='/home'>
        <Button style={{ marginBottom: '10px', marginRight: '10px' }}>
          <LeftOutlined />
          Voltar
        </Button>      
      </Link>
      <Link to='/aluno/criar'>
        <Button style={{ marginBottom: '10px' }}>
          <PlusCircleOutlined style={{ color: 'green' }} />Incluir</Button>
      </Link>
      <Card style={{ margin: 'auto', width: 'auto' }}>
        <Table
          columns={columns}
          dataSource={alunos}
          loading={loading}
          rowKey={record => record.id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
      <Modal
        title="Editar Aluno"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome do Aluno"
            rules={[{ required: true, message: 'Por favor, insira o nome do aluno!' }]}
          >
            <Input placeholder="Nome do Aluno" />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF do Aluno"
            rules={[{ required: true, message: 'Por favor, insira o CPF do aluno!' }]}
          >
            <Input placeholder="CPF do Aluno" />
          </Form.Item>
          <Form.Item
            name="idade"
            label="Idade do Aluno"
            rules={[{ required: true, message: 'Por favor, insira a idade do aluno!' }]}
          >
            <Input placeholder="Idade do Aluno" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarAluno;