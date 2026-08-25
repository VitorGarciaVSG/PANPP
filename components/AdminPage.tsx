import React, { useState, useEffect } from 'react';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  team: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(61) 9 9999-0001',
      category: 'Futebol',
      team: 'Time A',
      status: 'approved',
      createdAt: '2026-08-20',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '(61) 9 9999-0002',
      category: 'Ping Pong',
      team: 'Equipe B',
      status: 'pending',
      createdAt: '2026-08-21',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@example.com',
      phone: '(61) 9 9999-0003',
      category: 'Xadrez',
      team: 'Time C',
      status: 'approved',
      createdAt: '2026-08-22',
    },
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [
    'Futebol',
    'Ping Pong',
    'Dominó',
    'Volei',
    'Dama',
    'Xadrez',
    'Sinuca',
    'Truco',
  ];

  const filteredRegistrations = registrations.filter(reg => {
    const categoryMatch = filterCategory === 'all' || reg.category === filterCategory;
    const statusMatch = filterStatus === 'all' || reg.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const handleStatusChange = (id: number, newStatus: 'pending' | 'approved' | 'rejected') => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, status: newStatus } : reg))
    );
  };

  const deleteRegistration = (id: number) => {
    setRegistrations(prev => prev.filter(reg => reg.id !== id));
  };

  const stats = {
    total: registrations.length,
    approved: registrations.filter(r => r.status === 'approved').length,
    pending: registrations.filter(r => r.status === 'pending').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '✓ Aprovado';
      case 'rejected':
        return '✗ Recusado';
      case 'pending':
        return '⏳ Pendente';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Painel Administrativo</h1>
          <p className="text-gray-600">Gerenciar inscrições do evento desportivo</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold">Total de Inscrições</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold">Aprovadas</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-semibold">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-semibold">Recusadas</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🔍 Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os status</option>
                <option value="approved">Aprovado</option>
                <option value="pending">Pendente</option>
                <option value="rejected">Recusado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Categoria</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Equipe</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Nenhuma inscrição encontrada com os filtros selecionados
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{reg.name}</p>
                        <p className="text-sm text-gray-500">{reg.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {reg.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.team || '-'}</td>
                      <td className="px-6 py-4">
                        <select
                          value={reg.status}
                          onChange={(e) =>
                            handleStatusChange(reg.id, e.target.value as any)
                          }
                          className={`px-3 py-1 rounded-full text-sm border font-semibold cursor-pointer ${getStatusColor(
                            reg.status
                          )}`}
                        >
                          <option value="pending">Pendente</option>
                          <option value="approved">Aprovado</option>
                          <option value="rejected">Recusado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteRegistration(reg.id)}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm hover:underline"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            📥 Exportar para CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
