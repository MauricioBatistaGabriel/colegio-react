// src/pages/Signup.js
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importando Link
import { Form, Input, Button, Card } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
  const [form] = Form.useForm();
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    await signup(values.email, values.senha);
    setLoading(false);
    navigate('/login'); // Redireciona para a página de login após o cadastro bem-sucedido
  };

  return (
    <Card title="Cadastro" style={{ width: 300, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="signup" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="senha"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/">
            <Button type="default">Voltar para Login</Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
