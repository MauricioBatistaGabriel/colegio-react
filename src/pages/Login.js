import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [form] = Form.useForm();
  const { authState, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    await login(values.email, values.senha);
    navigate('/home');
    setLoading(false);
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/home');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <Card title="Login" style={{ width: 300, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="login" onFinish={onFinish}>
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
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/signup">
            <Button type="default">Cadastrar</Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
