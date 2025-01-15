import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Select, DatePicker, message } from 'antd';
import { listarMateriaByTurma } from '../../services/materiaServices';
import { listarProfessoresByFilter } from '../../services/professorService';
import { criarAula, listarTurmas, listarHorasAula } from '../../services/aulaService';
import { listarHorasAulaByTurma } from '../../services/HoraAulaService';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CriarAula = () => {
  const [form] = Form.useForm();
  const [professores, setProfessores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [horasAula, setHorasAula] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turmasData = await listarTurmas();
        setTurmas(turmasData || []);
      } catch (error) {
        message.error('Falha ao carregar os dados.');
      }
    };

    fetchData();
  }, []);

  const carregarHorasAula = async (id) => {
    try {
      const horasAula = await listarHorasAulaByTurma(id);
      setHorasAula(horasAula);
    } catch (error) {
      message.error('Falha ao carregar as horas aula.');
    }
  };

  const carregarMaterias = async (id) => {
    try {
      const materias = await listarMateriaByTurma(id);
      setMaterias(materias);
    } catch (error) {
      message.error('Falha ao carregar as matérias.');
    }
  };

  const carregarProfessores = async (filterProfessor) => {
    try {
      const professores = await listarProfessoresByFilter(filterProfessor);
      setProfessores(professores);
    } catch (error) {
      message.error('Falha ao carregar os professores.');
    }
  };

  const onTurmaChange = (id) => {
    form.setFieldsValue({ materia: null, professor: null });
    setMaterias([]);
    setProfessores([]);
    carregarMaterias(id);
    carregarHorasAula(id); // Adiciona chamada para listar horasAula
  };

  const atualizarProfessores = async () => {
    const { horaaula, data, materia, turma } = form.getFieldsValue(['horaaula', 'data', 'materia', 'turma']);
    const filterProfessor = {
      turma: turma,
      materia: materia,
      horaAula: horaaula,
      data: data ? data.format('YYYY-MM-DD') : null
    };

    form.setFieldsValue({ professor: null });
    setProfessores([]);
    if (filterProfessor.turma && filterProfessor.materia && filterProfessor.horaAula && filterProfessor.data) {
      await carregarProfessores(filterProfessor);
    }
  };

  const onMateriaChange = () => {
    atualizarProfessores();
  };

  const onHoraAulaChange = () => {
    atualizarProfessores();
  };

  const onDateChange = () => {
    atualizarProfessores();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const aula = {
        horaaula: values.horaaula, // ID da hora da aula
        data: values.data.format('YYYY-MM-DD'), // Data no formato esperado
        turma: values.turma, // ID da turma
        materia: values.materia, // ID da matéria
        professor: values.professor, // ID do professor
      };
      await criarAula(aula);
      message.success('Aula criada com sucesso!');
      form.resetFields();
      navigate('/aula/listar');
    } catch (error) {
      message.error('Falha ao criar a Aula.');
      console.error('Erro ao criar a Aula', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Aula" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-aula" onFinish={onFinish} layout={'vertical'}>
        <Form.Item
          name="turma"
          label="Turma"
          rules={[{ required: true, message: 'Por favor, selecione a turma!' }]}
        >
          <Select onChange={onTurmaChange} placeholder="Selecione a turma">
            {turmas.map((turma) => (
              <Option key={turma.id} value={turma.id}>
                {turma.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="materia"
          label="Matéria"
          rules={[{ required: true, message: 'Por favor, selecione a matéria!' }]}
        >
          <Select onChange={onMateriaChange} disabled={!materias.length} placeholder="Selecione a matéria">
            {materias.map((materia) => (
              <Option key={materia.id} value={materia.id}>
                {materia.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="horaaula"
          label="Hora da Aula"
          rules={[{ required: true, message: 'Por favor, selecione a hora da aula!' }]}
        >
          <Select disabled={!horasAula.length} onChange={onHoraAulaChange} placeholder="Selecione a hora da aula">
            {horasAula.map((hora) => (
              <Option key={hora.id} value={hora.id}>
                {`${moment(hora.horaInicial, 'HH:mm').format('HH:mm')} - ${moment(hora.horaFinal, 'HH:mm').format('HH:mm')}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="data"
          label="Data"
          rules={[{ required: true, message: 'Por favor, selecione a data!' }]}
        >
          <DatePicker onChange={onDateChange} format="YYYY-MM-DD" placeholder="Selecione a data" />
        </Form.Item>
        <Form.Item
          name="professor"
          label="Professor"
          rules={[{ required: true, message: 'Por favor, selecione o professor!' }]}
        >
          <Select disabled={!professores.length} placeholder="Selecione o professor">
            {professores.map((professor) => (
              <Option key={professor.id} value={professor.id}>
                {professor.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CriarAula;