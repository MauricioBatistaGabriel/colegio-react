// src/pages/Turma/CriarTurma.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, message } from 'antd';
import { criarTurma, listarMaterias } from '../../services/turmaService';
import {listarAlunoSemTurma } from '../../services/alunoService';
import {listarSalasPorPeriodo} from '../../services/salaService';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CriarTurma = () => {
  const [form] = Form.useForm();
  const [materias, setMaterias] = useState([]);
  const [salas, setSalas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasData = await listarMaterias();
        setMaterias(materiasData);

        const alunosData = await listarAlunoSemTurma();
        setAlunos(alunosData);
      } catch (error) {
        message.error('Falha ao carregar os dados.');
      }
    };

    fetchData();
  }, []);

  const carregarSalas = async (periodo) => { 
    try { 
      const salasDisponiveis = await listarSalasPorPeriodo(periodo); 
      setSalas(salasDisponiveis); 
    } catch (error) { 
      message.error('Falha ao carregar as salas.'); 
    }
  }; 
  
  const onPeriodoChange = (periodo) => { 
    form.setFieldsValue({ sala: null });
    carregarSalas(periodo);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const turma = {
        nome: values.nome,
        sala: values.sala,
        periodo: values.periodo,
        materias: values.materias,
        alunos: values.alunos
      };
      await criarTurma(turma);
      message.success('Turma criada com sucesso!');
      const alunosData = await listarAlunoSemTurma();
      setAlunos(alunosData);
      form.resetFields();
      navigate('/turma/listar');
    } catch (error) {
      message.error('Falha ao criar a turma.');
      console.error('Erro ao criar a turma', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Turma" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-turma" onFinish={onFinish} layout={'vertical'}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome da turma!' }]}>
          <Input placeholder="Nome da Turma" />
        </Form.Item>
        <Form.Item name="periodo" label="Período" rules={[{ required: true, message: 'Por favor, selecione um período!' }]}>
          <Select placeholder="Selecione o período" style={{ width: '100%' }} onChange={onPeriodoChange}>
            <Option value="matutino">Matutino</Option>
            <Option value="vespertino">Vespertino</Option>
            <Option value="noturno">Noturno</Option>
          </Select>
        </Form.Item>
        <Form.Item name="sala" label="Sala" rules={[{ required: true, message: 'Por favor, selecione a sala!' }]}>
          <Select placeholder="Selecione a sala" disabled={!salas.length}>            
              {salas.map(sala => (
              <Option key={sala.id} value={sala.id}>
                {sala.sala}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="materias" label="Matérias" rules={[{ required: true, message: 'Por favor, selecione ao menos uma matéria!' }]}>
          <Select mode="multiple" placeholder="Selecione as matérias" style={{ width: '100%' }}>
            {materias.map(materia => (
              <Option key={materia.id} value={materia.id}>
                {materia.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="alunos" label="Alunos">
          <Select mode="multiple" placeholder="Selecione os alunos" style={{ width: '100%' }}>
            {alunos.map(aluno => (
              <Option key={aluno.id} value={aluno.id}>
                {aluno.nome}
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

export default CriarTurma;
