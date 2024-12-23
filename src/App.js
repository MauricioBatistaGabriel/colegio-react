import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AlunoHome from './pages/Aluno/Home';
import CriarAluno from './pages/Aluno/CriarAluno';
import ListarAlunos from './pages/Aluno/ListarAlunos';
import ProfessorHome from './pages/Professor/Home';
import CriarProfessor from './pages/Professor/CriarProfessor';
import ListarProfessores from './pages/Professor/ListarProfessores';
import MateriaHome from './pages/Materia/Home';
import CriarMateria from './pages/Materia/CriarMateria';
import ListarMaterias from './pages/Materia/ListarMaterias';

const { Header, Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/aluno">Aluno</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/professor">Professor</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/materia">Matéria</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> {/* Adicionando a rota de cadastro */}
                <Route path="/aluno" element={<PrivateRoute><AlunoHome /></PrivateRoute>} />
                <Route path="/aluno/criar" element={<PrivateRoute><CriarAluno /></PrivateRoute>} />
                <Route path="/aluno/listar" element={<PrivateRoute><ListarAlunos /></PrivateRoute>} />
                <Route path="/professor" element={<PrivateRoute><ProfessorHome /></PrivateRoute>} />
                <Route path="/professor/criar" element={<PrivateRoute><CriarProfessor /></PrivateRoute>} />
                <Route path="/professor/listar" element={<PrivateRoute><ListarProfessores /></PrivateRoute>} />
                <Route path="/materia" element={<PrivateRoute><MateriaHome /></PrivateRoute>} />
                <Route path="/materia/criar" element={<PrivateRoute><CriarMateria /></PrivateRoute>} />
                <Route path="/materia/listar" element={<PrivateRoute><ListarMaterias /></PrivateRoute>} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
