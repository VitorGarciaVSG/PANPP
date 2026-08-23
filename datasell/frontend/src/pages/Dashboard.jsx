import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/metrics')
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>📊 DataSell</h1>
          <p>Dashboard de Análise de Vendas</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>{user?.name}</span>
            <small>{user?.email}</small>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="metrics-cards">
          <div className="metric-card green">
            <div className="metric-label">💰 Receita Total</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">R$ {data?.totalSales?.toLocaleString('pt-BR')}</div>
                <small className="metric-change">↑ 23% vs mês anterior</small>
              </>
            )}
          </div>

          <div className="metric-card blue">
            <div className="metric-label">📦 Produtos Vendidos</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">{data?.totalProducts}</div>
                <small className="metric-change">↑ 15% vs mês anterior</small>
              </>
            )}
          </div>

          <div className="metric-card">
            <div className="metric-label">⭐ Ticket Médio</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">R$ {data?.averageTicket?.toLocaleString('pt-BR')}</div>
                <small className="metric-change">→ Estável</small>
              </>
            )}
          </div>

          <div className="metric-card">
            <div className="metric-label">📈 Crescimento Mês</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">{data?.monthlyGrowth}%</div>
                <small className="metric-change">↑ Melhorando</small>
              </>
            )}
          </div>
        </section>

        <section className="features">
          <h2>🚀 Recursos Disponíveis</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔗</div>
              <div className="feature-content">
                <h3>Integração Mercado Livre</h3>
                <p>Conecte sua conta MELI e sincronize produtos automaticamente</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🛒</div>
              <div className="feature-content">
                <h3>Integração Shopee</h3>
                <p>Analise vendas da Shopee em tempo real</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h3>Análise de Produtos</h3>
                <p>Veja quais produtos vendem mais e geram mais lucro</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <div className="feature-content">
                <h3>Recomendações</h3>
                <p>Receba sugestões de preço baseadas em IA</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💹</div>
              <div className="feature-content">
                <h3>Margem de Lucro</h3>
                <p>Calcule a margem de lucro de cada produto</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📈</div>
              <div className="feature-content">
                <h3>Dashboard em Tempo Real</h3>
                <p>Acompanhe suas métricas 24/7</p>
              </div>
            </div>
          </div>
        </section>

        <section className="plan-info">
          <div className="plan-card">
            <h3>Seu Plano Atual</h3>
            <div className="plan-badge">
              {user?.plan === 'FREE' && '🆓 FREE'}
              {user?.plan === 'PRO' && '⭐ PRO'}
              {user?.plan === 'ENTERPRISE' && '🚀 ENTERPRISE'}
            </div>
            <p>
              {user?.plan === 'FREE' && 'Até 5 produtos e análise básica'}
              {user?.plan === 'PRO' && 'Até 50 produtos e análise avançada'}
              {user?.plan === 'ENTERPRISE' && 'Produtos ilimitados com API completa'}
            </p>
            <button className="upgrade-btn">Mudar Plano</button>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>💡 DataSell v1.0.0 | Maximize seu faturamento com análise inteligente</p>
      </footer>
    </div>
  )
}

export default Dashboard
