// src/pages/HoraAula/ListarHorasAula.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Input, TimePicker, Select, Breadcrumb } from 'antd';
import moment from 'moment';
import { listarHorasAula, excluirHoraAula, editarHoraAula } from '../../services/HoraAulaService';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ListarHorasAula = () => {
  const [horasAula, setHorasAula] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHoraAula, setSelectedHoraAula] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const horasAulaData = await listarHorasAula();
        setHorasAula(horasAulaData);
      } catch (error) {
        message.error('Falha ao carregar os dados.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirHoraAula(id);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        setHorasAula(horasAula.filter(horaAula => horaAula.id !== id));
        message.success('Hora Aula excluída com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir a Hora Aula.');
    }
  };

  const handleEdit = (record) => {
    setSelectedHoraAula(record);
    form.setFieldsValue({
      horaInicial: moment(record.horaInicial, 'HH:mm'),
      horaFinal: moment(record.horaFinal, 'HH:mm'),
      periodo: record.periodoDaHoraAula
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedHoraAula(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        horaInicial: values.horaInicial.format('HH:mm'),
        horaFinal: values.horaFinal.format('HH:mm'),
        periodoDaHoraAula: values.periodo
      };
      const result = await editarHoraAula(selectedHoraAula.id, payload);
      if (result && result.error) {
        message.error(result.error); // Exibe mensagem de erro em vermelho
      } else {
        const updatedHorasAula = await listarHorasAula(); // Atualiza a lista de horas aula após a edição
        setHorasAula(updatedHorasAula);
        message.success('Hora Aula atualizada com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar a Hora Aula.');
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hora Inicial',
      dataIndex: 'horaInicial',
      key: 'horaInicial',
    },
    {
      title: 'Hora Final',
      dataIndex: 'horaFinal',
      key: 'horaFinal',
    },
    {
      title: 'Periodo',
      dataIndex: 'periodoDaHoraAula',
      key: 'periodoDaHoraAula',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta Hora Aula?"
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
        <h1>Horas Aula</h1>
          <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Horas Aula</Breadcrumb.Item>
          <Breadcrumb.Item>Listar</Breadcrumb.Item>
          </Breadcrumb>
                <Link to='/home'>
                <Button style={{marginBottom:'10px', marginRight:'10px'}}>Voltar Home</Button>
                </Link>
          <Link to='/hora-aula/criar'>
          <Button style={{ backgroundColor: 'green', color: 'white', marginBottom:'10px'}}>Incluir</Button>
          </Link>
      <Table
        columns={columns}
        dataSource={horasAula}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Editar Hora Aula"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="horaInicial"
            label="Hora Inicial"
            rules={[{ required: true, message: 'Por favor, insira a hora inicial!' }]}
          >
            <TimePicker format="HH:mm" placeholder="Hora Inicial" />
          </Form.Item>
          <Form.Item
            name="horaFinal"
            label="Hora Final"
            rules={[{ required: true, message: 'Por favor, insira a hora final!' }]}
          >
            <TimePicker format="HH:mm" placeholder="Hora Final" />
          </Form.Item>
          <Form.Item name="periodo" label="Período" rules={[{ required: true, message: 'Por favor, selecione um período!' }]}>
          <Select placeholder="Selecione o período" style={{ width: '100%' }}>
            <Option value="matutino">Matutino</Option>
            <Option value="vespertino">Vespertino</Option>
            <Option value="noturno">Noturno</Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarHorasAula;
