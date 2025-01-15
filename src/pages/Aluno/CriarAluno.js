// src/pages/Aluno/CriarAluno.js
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { criarAluno } from '../../services/alunoService';
import { useNavigate } from 'react-router-dom';

const CriarAluno = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const aluno = {
        email: values.email,
        nome: values.nome,
        cpf: values.cpf,
        senha: values.senha,
        idade: values.idade,
      };
      await criarAluno(aluno);
      message.success('Aluno criado com sucesso!');
      form.resetFields();
      navigate('/aluno/listar');
    } catch (error) {
      message.error('Falha ao criar o aluno.');
      console.error('Erro ao criar o aluno', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Aluno" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-aluno" onFinish={onFinish} layout={'vertical'}>
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
        <Form.Item name="idade" label="Idade" rules={[{ required: true, message: 'Por favor, insira a idade!' }]}>
          <Input placeholder="Idade" />
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

export default CriarAluno;
