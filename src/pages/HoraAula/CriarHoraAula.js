// src/pages/HoraAula/CriarHoraAula.js
import React, { useState } from 'react';
import { Form, Input, Button, Card, TimePicker, Select, message } from 'antd';
import { criarHoraAula } from '../../services/HoraAulaService';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CriarHoraAula = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const horaAula = {
        horaInicial: values.horaInicial.format('HH:mm'),
        horaFinal: values.horaFinal.format('HH:mm'),
        periodoDaHoraAula: values.periodo,
      };
      await criarHoraAula(horaAula);
      message.success('Hora Aula criada com sucesso!');
      form.resetFields();
      navigate('/hora-aula/listar');
    } catch (error) {
      message.error('Falha ao criar a Hora Aula.');
      console.error('Erro ao criar a Hora Aula', error);
    }
    setLoading(false);
  };

  return (
    <Card title="Criar Hora Aula" style={{ width: 600, margin: 'auto', marginTop: '100px' }}>
      <Form form={form} name="criar-hora-aula" onFinish={onFinish} layout={'vertical'}>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CriarHoraAula;
