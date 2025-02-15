import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Form, Select, DatePicker, Breadcrumb, Card } from 'antd';
import { listarAulas, excluirAula, editarAula, listarTurmas, listarProfessores, listarMaterias, listarHorasAula } from '../../services/aulaService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LeftOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ListarAulas = () => {
  const [aulas, setAulas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [horasAula, setHorasAula] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAula, setSelectedAula] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [aulasData, turmasData, materiasData, professoresData, horasAulaData] = await Promise.all([
          listarAulas(),
          listarTurmas(),
          listarMaterias(),
          listarProfessores(),
          listarHorasAula()
        ]);

        setAulas(aulasData || []);
        setTurmas(turmasData || []);
        setMaterias(materiasData || []);
        setProfessores(professoresData || []);
        setHorasAula(Array.isArray(horasAulaData) ? horasAulaData : []);
      } catch (error) {
        message.error('Falha ao carregar os dados.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await excluirAula(id);
      if (result && result.error) {
        message.error(result.error);
      } else {
        setAulas(aulas.filter(aula => aula.id !== id));
        message.success('Aula excluída com sucesso!');
      }
    } catch (error) {
      message.error('Falha ao excluir a aula.');
    }
  };

  const handleEdit = (record) => {
    setSelectedAula(record);
    form.setFieldsValue({
      turma: record?.turma?.id || null,
      materia: record?.materia?.id || null,
      professor: record?.professor?.id || null,
      horaaula: record?.horaaula?.id || null,
      data: moment(record?.data, 'YYYY-MM-DD'),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAula(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        turma: values.turma,
        materia: values.materia,
        professor: values.professor,
        horaaula: values.horaaula,
        data: values.data.format('YYYY-MM-DD'),
      };
      const result = await editarAula(selectedAula.id, payload);
      if (result && result.error) {
        message.error(result.error);
      } else {
        const updatedAulas = aulas.map(aula => (
          aula.id === selectedAula.id ?
            {
              ...aula,
              ...values,
              turma: turmas.find(t => t.id === values.turma),
              materia: materias.find(m => m.id === values.materia),
              professor: professores.find(p => p.id === values.professor),
              horaaula: horasAula.find(h => h.id === values.horaaula)
            } : aula
        ));
        setAulas(updatedAulas);
        message.success('Aula atualizada com sucesso!');
        handleCancel();
      }
    } catch (error) {
      message.error('Falha ao atualizar a aula.');
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
      title: 'Turma',
      dataIndex: 'turma',
      key: 'turma',
      render: (turma) => turma.nome,
    },
    {
      title: 'Sala',
      dataIndex: 'turma',
      key: 'sala',
      render: (turma) => turma.sala.sala || 'Não informado',
    },
    {
      title: 'Matéria',
      dataIndex: 'materia',
      key: 'materia',
      render: (materia) => materia.nome,
    },
    {
      title: 'Professor',
      dataIndex: 'professor',
      key: 'professor',
      render: (professor) => professor.nome,
    },
    {
      title: 'Hora Aula',
      dataIndex: 'horaaula',
      key: 'horaaula',
      render: (horaaula) =>
        horaaula
          ? `${moment(horaaula.horaInicial, 'HH:mm').format('HH:mm')} - ${moment(horaaula.horaFinal, 'HH:mm').format('HH:mm')}`
          : 'Não informado',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (data) => moment(data).format('DD/MM/YYYY'),
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: 'blue', marginRight: '10px', fontSize: '17px' }} type="link" onClick={() => handleEdit(record)}></EditOutlined>
          <Popconfirm title="Tem certeza que deseja excluir esta aula?" onConfirm={() => handleDelete(record.id)} okText="Sim" cancelText="Não">
          <DeleteOutlined style={{ color: 'red', fontSize: '17px' }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>Aulas</h1>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Aula</Breadcrumb.Item>
        <Breadcrumb.Item>Listar</Breadcrumb.Item>
      </Breadcrumb>
      <Link to='/home'>
        <Button style={{ marginBottom: '10px', marginRight: '10px' }}>
          <LeftOutlined />
          Voltar
        </Button>
      </Link>
      <Link to='/aula/criar'>
        <Button style={{ marginBottom: '10px' }}>
          <PlusCircleOutlined style={{ color: 'green' }} />Incluir
        </Button>
      </Link>
      <Card style={{ margin: 'auto', width: 'auto' }}>
        <Table
          columns={columns}
          dataSource={aulas}
          loading={loading}
          rowKey={record => record.id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
      <Modal title="Editar Aula" open={isModalVisible} onCancel={handleCancel} onOk={handleSave} okText="Salvar" cancelText="Cancelar">
        <Form form={form} layout="vertical">
          <Form.Item name="turma" label="Turma" rules={[{ required: true, message: 'Por favor, selecione a turma!' }]}>
            <Select placeholder="Selecione a turma">
              {turmas.map((turma) => (
                <Select.Option key={turma.id} value={turma.id}>
                  {turma.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="materia" label="Matéria" rules={[{ required: true, message: 'Por favor, selecione a matéria!' }]}>
            <Select placeholder="Selecione a matéria">
              {materias.map((materia) => (
                <Select.Option key={materia.id} value={materia.id}>
                  {materia.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="professor" label="Professor" rules={[{ required: true, message: 'Por favor, selecione o professor!' }]}>
            <Select placeholder="Selecione o professor">
              {professores.map((professor) => (
                <Select.Option key={professor.id} value={professor.id}>
                  {professor.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="horaaula" label="Hora da Aula" rules={[{ required: true, message: 'Por favor, selecione a hora da aula!' }]}>
            <Select placeholder="Selecione a hora da aula">
              {horasAula.map((hora) => (
                <Select.Option key={hora.id} value={hora.id}>
                  {`${moment(hora.horaInicial, 'HH:mm').format('HH:mm')} - ${moment(hora.horaFinal, 'HH:mm').format('HH:mm')}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="data" label="Data" rules={[{ required: true, message: 'Por favor, insira a data!' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="Selecione a data" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListarAulas;