import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import LandingPage from './pages/LadingPage';
import GeradorCPF from './pages/GeradorCPF';
import ConversorMoedas from './pages/ConversorMoedas';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gerador-cpf" element={<GeradorCPF />} />
        <Route path="/conversor-moedas" element={<ConversorMoedas />} />
      </Routes>
    </>
  );
}

export default App
