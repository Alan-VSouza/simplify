import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { tools } from './lib/tools';

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <Header />
      <main id="main-content">
        <Suspense fallback={<p className="container">Carregando ferramenta...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            {tools.map((tool) => (
              <Route key={tool.id} path={tool.path} element={<tool.Component />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
