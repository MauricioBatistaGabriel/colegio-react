// src/pages/Materia/CriarMateria.js
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { criarMateria } from '../../services/materiaServices';
import { useNavigate } from 'react-router-dom';

const CriarMateria = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await criarMateria({ nome: values.nome });
      message.success('Matéria criada com sucesso!');
      form.resetFields();
      navigate('/materia/listar');
    } catch (error) {
      message.error('Falha ao criar a matéria.');
      console.error('Erro ao criar a matéria', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Matéria" style={{ width: 400, margin: 'auto', marginTop: '100px' }}>
      <Form name="criar-materia" onFinish={onFinish} layout={'vertical'}>
        <Form.Item
          name="nome"
          label="Matéria"
          rules={[{ required: true, message: 'Por favor, insira o nome da matéria!' }]}
        >
          <Input placeholder="Nome da Matéria" />
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

export default CriarMateria;
