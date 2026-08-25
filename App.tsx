import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import AdminPage from './components/AdminPage';

type Page = 'home' | 'registration' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <>
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-400 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
              🏆
            </div>
            <h1 className="text-xl font-bold">EVENTO DESPORTIVO - CAESB</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded transition ${
                currentPage === 'home' ? 'bg-green-500' : 'hover:bg-blue-800'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentPage('registration')}
              className={`px-4 py-2 rounded transition ${
                currentPage === 'registration' ? 'bg-green-500' : 'hover:bg-blue-800'
              }`}
            >
              Inscrição
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`px-4 py-2 rounded transition ${
                currentPage === 'admin' ? 'bg-green-500' : 'hover:bg-blue-800'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'registration' && <RegistrationPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400">© 2026 Evento Desportivo CAESB - Todos os direitos reservados</p>
          <p className="text-xs text-gray-500 mt-2">Desenvolvido com ❤️ para o Clube CAESB</p>
        </div>
      </footer>
    </>
  );
};

export default App;
