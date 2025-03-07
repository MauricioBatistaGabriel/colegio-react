import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { criarSala } from '../../services/salaService';
import { useNavigate } from 'react-router-dom';

const CriarSala = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const sala = {
        sala: values.sala
      };
      await criarSala(sala);
      message.success('Sala criada com sucesso!');
      form.resetFields();
      navigate('/sala/listar');
    } catch (error) {
      message.error('Falha ao criar a sala.');
      console.error('Erro ao criar a sala', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Sala" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-sala" onFinish={onFinish} layout={'vertical'}>
        <Form.Item 
          name="sala" 
          label="Sala" 
          rules={[{ required: true, message: 'Por favor, insira o nome da sala!' }]}
        >
          <Input placeholder="Nome da Sala" />
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

export default CriarSala;