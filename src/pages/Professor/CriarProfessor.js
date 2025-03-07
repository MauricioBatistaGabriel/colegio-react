import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, Tag, Checkbox, message } from 'antd';
import { criarProfessor, listarMaterias } from '../../services/professorService';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CriarProfessor = () => {
  const [form] = Form.useForm();
  const [materias, setMaterias] = useState([]);
  const [selectedMaterias, setSelectedMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await listarMaterias();
        setMaterias(data);
      } catch (error) {
        message.error('Falha ao carregar as matérias.');
      }
    };

    fetchMaterias();
  }, []);

  const handleSelectMateria = (value) => {
    if (!selectedMaterias.some(materia => materia.id === value)) {
      const selectedMateria = materias.find(materia => materia.id === value);
      setSelectedMaterias([...selectedMaterias, { id: selectedMateria.id, nome: selectedMateria.nome }]);
    }
  };

  const handleRemoveMateria = (id) => {
    setSelectedMaterias(selectedMaterias.filter(materia => materia.id !== id));
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const professor = {
        email: values.email,
        senha: values.senha,
        nome: values.nome,
        cpf: values.cpf,
        materias: selectedMaterias.map(materia => materia.id),
        periodosDeTrabalho: values.periodos,
      };
      await criarProfessor(professor);
      message.success('Professor criado com sucesso!');
      form.resetFields();
      setSelectedMaterias([]);
      navigate('/professor/listar');
    } catch (error) {
      message.error('Falha ao criar o professor.');
      console.error('Erro ao criar o professor', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Professor" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-professor" onFinish={onFinish} layout={'vertical'}>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="senha" label="Senha" rules={[{ required: true, message: 'Por favor, insira a senha!' }]}>
          <Input.Password placeholder="Senha" />
        </Form.Item>
        <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item name="cpf" label="CPF" rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}>
          <Input placeholder="CPF" />
        </Form.Item>
        <Form.Item label="Matérias">
          <Select
            placeholder="Selecione matérias"
            onChange={handleSelectMateria}
            style={{ width: '100%' }}
          >
            {materias.map(materia => (
              <Option key={materia.id} value={materia.id}>
                {materia.nome}
              </Option>
            ))}
          </Select>
          <div style={{ marginTop: 16 }}>
            {selectedMaterias.map(materia => (
              <Tag closable onClose={() => handleRemoveMateria(materia.id)} key={materia.id}>
                {materia.nome}
              </Tag>
            ))}
          </div>
        </Form.Item>
        <Form.Item name="periodos" label="Períodos" rules={[{ required: true, message: 'Por favor, selecione ao menos um período!' }]}>
          <Checkbox.Group>
            <Checkbox value="matutino">Matutino</Checkbox>
            <Checkbox value="vespertino">Vespertino</Checkbox>
            <Checkbox value="noturno">Noturno</Checkbox>
          </Checkbox.Group>
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

export default CriarProfessor;
