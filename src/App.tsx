import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import LandingPage from './pages/LadingPage';
import GeradorCPF from './pages/GeradorCPF';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gerador-cpf" element={<GeradorCPF />} />
      </Routes>
    </>
  );
}

export default App
