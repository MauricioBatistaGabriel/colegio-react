import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AlunoHome from './pages/Aluno/Home';
import CriarAluno from './pages/Aluno/CriarAluno';
import ListarAlunos from './pages/Aluno/ListarAlunos';
import AulaHome from './pages/Aula/Home';
import CriarAula from './pages/Aula/CriarAula';
import ListarAulas from './pages/Aula/ListarAulas';
import ProfessorHome from './pages/Professor/Home';
import CriarProfessor from './pages/Professor/CriarProfessor';
import ListarProfessores from './pages/Professor/ListarProfessores';
import SalaHome from './pages/Sala/Home';
import CriarSala from './pages/Sala/CriarSala';
import ListarSalas from './pages/Sala/ListarSalas';
import TurmaHome from './pages/Turma/Home';
import CriarTurma from './pages/Turma/CriarTurma';
import ListarTurmas from './pages/Turma/ListarTurmas';
import MateriaHome from './pages/Materia/Home';
import CriarMateria from './pages/Materia/CriarMateria';
import ListarMaterias from './pages/Materia/ListarMaterias';
import HoraAulaHome from './pages/HoraAula/Home';
import CriarHoraAula from './pages/HoraAula/CriarHoraAula';
import ListarHorasAula from './pages/HoraAula/ListarHorasAula';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  const showMenu = location.pathname !== '/auth' && location.pathname !== '/signup';

  return (
    <>
    <div className='container'>
    <Layout className="layout" style={{ width: '100%' }}>
      {showMenu && (
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between' }} selectedKeys={[selectedKey]}>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Menu.Item key="/home">
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="/aluno/listar">
                <Link to="/aluno/listar">Aluno</Link>
              </Menu.Item>
              <Menu.Item key="/professor/listar">
                <Link to="/professor/listar">Professor</Link>
              </Menu.Item>
              <Menu.Item key="/materia/listar">
                <Link to="/materia/listar">Matéria</Link>
              </Menu.Item>
              <Menu.Item key="/aula/listar">
                <Link to="/aula/listar">Aula</Link>
              </Menu.Item>
              <Menu.Item key="/sala/listar">
                <Link to="/sala/listar">Sala</Link>
              </Menu.Item>
              <Menu.Item key="/turma/listar">
                <Link to="/turma/listar">Turma</Link>
              </Menu.Item>
              <Menu.Item key="/hora-aula/listar">
                <Link to="/hora-aula/listar">Hora Aula</Link>
              </Menu.Item>
            </div>
            <Menu.Item key="logout" style={{ marginLeft: 'auto' }} onClick={logout}>
              <LogoutOutlined />
            </Menu.Item>
          </Menu>
        </Header>
      )}
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/auth" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aluno" element={<PrivateRoute><AlunoHome /></PrivateRoute>} />
            <Route path="/aluno/criar" element={<PrivateRoute><CriarAluno /></PrivateRoute>} />
            <Route path="/aluno/listar" element={<PrivateRoute><ListarAlunos /></PrivateRoute>} />
            <Route path="/professor" element={<PrivateRoute><ProfessorHome /></PrivateRoute>} />
            <Route path="/professor/criar" element={<PrivateRoute><CriarProfessor /></PrivateRoute>} />
            <Route path="/professor/listar" element={<PrivateRoute><ListarProfessores /></PrivateRoute>} />
            <Route path="/materia" element={<PrivateRoute><MateriaHome /></PrivateRoute>} />
            <Route path="/materia/criar" element={<PrivateRoute><CriarMateria /></PrivateRoute>} />
            <Route path="/materia/listar" element={<PrivateRoute><ListarMaterias /></PrivateRoute>} />
            <Route path="/aula" element={<PrivateRoute><AulaHome /></PrivateRoute>} />
            <Route path="/aula/criar" element={<PrivateRoute><CriarAula /></PrivateRoute>} />
            <Route path="/aula/listar" element={<PrivateRoute><ListarAulas /></PrivateRoute>} />
            <Route path="/sala" element={<PrivateRoute><SalaHome /></PrivateRoute>} />
            <Route path="/sala/criar" element={<PrivateRoute><CriarSala /></PrivateRoute>} />
            <Route path="/sala/listar" element={<PrivateRoute><ListarSalas /></PrivateRoute>} />
            <Route path="/turma" element={<PrivateRoute><TurmaHome /></PrivateRoute>} />
            <Route path="/turma/criar" element={<PrivateRoute><CriarTurma /></PrivateRoute>} />
            <Route path="/turma/listar" element={<PrivateRoute><ListarTurmas /></PrivateRoute>} />
            <Route path="/hora-aula" element={<PrivateRoute><HoraAulaHome /></PrivateRoute>} />
            <Route path="/hora-aula/criar" element={<PrivateRoute><CriarHoraAula /></PrivateRoute>} />
            <Route path="/hora-aula/listar" element={<PrivateRoute><ListarHorasAula /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', marginBottom:'0px' }}>
        ©{new Date().getFullYear()} Created by <a href='https://www.linkedin.com/in/mauriciobatistagabriel/'>Mauricio Batista Gabriel</a>
      </Footer>
    </Layout>
    </div>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default AppWrapper;