import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [suggestions, setSuggestions] = useState(null)
  const [bookings, setBookings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, suggestionsRes, bookingsRes] = await Promise.all([
          fetch('/api/dashboard/metrics'),
          fetch('/api/dashboard/pricing-suggestions'),
          fetch('/api/dashboard/bookings')
        ])

        const metricsData = await metricsRes.json()
        const suggestionsData = await suggestionsRes.json()
        const bookingsData = await bookingsRes.json()

        setData(metricsData.data)
        setSuggestions(suggestionsData.data)
        setBookings(bookingsData.data)
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
          <h1>🏠 RentalIQ</h1>
          <p>Sistema de Precificação Dinâmica</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>{user?.name}</span>
            <small>{user?.company || user?.email}</small>
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
                <div className="metric-value">R$ {data?.totalRevenue?.toLocaleString('pt-BR')}</div>
                <small className="metric-change">↑ 12% vs mês anterior</small>
              </>
            )}
          </div>

          <div className="metric-card blue">
            <div className="metric-label">📊 Taxa de Ocupação</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">{data?.occupancyRate}%</div>
                <small className="metric-change">↑ Excelente performance</small>
              </>
            )}
          </div>

          <div className="metric-card">
            <div className="metric-label">📅 Total de Reservas</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">{data?.totalBookings}</div>
                <small className="metric-change">→ Este mês</small>
              </>
            )}
          </div>

          <div className="metric-card">
            <div className="metric-label">💵 Preço Médio/Noite</div>
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <>
                <div className="metric-value">R$ {data?.avgPricePerNight?.toLocaleString('pt-BR')}</div>
                <small className="metric-change">→ Estável</small>
              </>
            )}
          </div>
        </section>

        <section className="pricing-section">
          <h2>🎯 Sugestões de Preço (IA)</h2>
          {loading ? (
            <div className="loading-box">Analisando mercado...</div>
          ) : (
            <div className="pricing-card">
              <div className="pricing-current">
                <span className="label">Preço Atual</span>
                <span className="value">R$ {suggestions?.currentPrice?.toLocaleString('pt-BR')}</span>
              </div>
              <div className="pricing-arrow">→</div>
              <div className="pricing-suggested">
                <span className="label">Preço Sugerido</span>
                <span className="value">R$ {suggestions?.suggestedPrice?.toLocaleString('pt-BR')}</span>
              </div>
              <div className="pricing-confidence">
                <span className="label">Confiança</span>
                <span className="value">{(suggestions?.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="pricing-reasoning">
                <p>{suggestions?.reasoning}</p>
              </div>
            </div>
          )}
        </section>

        <section className="bookings-section">
          <h2>📅 Reservas Recentes</h2>
          {loading ? (
            <div className="loading-box">Carregando reservas...</div>
          ) : (
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Hóspede</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Noites</th>
                    <th>Total</th>
                    <th>Plataforma</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.guestName}</td>
                      <td>{new Date(booking.checkIn).toLocaleDateString('pt-BR')}</td>
                      <td>{new Date(booking.checkOut).toLocaleDateString('pt-BR')}</td>
                      <td>{booking.nights}</td>
                      <td>R$ {booking.totalPrice.toLocaleString('pt-BR')}</td>
                      <td>{booking.platform}</td>
                      <td><span className="status-badge confirmed">{booking.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
              {user?.plan === 'FREE' && 'Até 1 propriedade com análises básicas'}
              {user?.plan === 'PRO' && 'Até 5 propriedades com IA avançada'}
              {user?.plan === 'ENTERPRISE' && 'Propriedades ilimitadas com suporte dedicado'}
            </p>
            <button className="upgrade-btn">Mudar Plano</button>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>🏡 RentalIQ v1.0.0 | Maximize seus lucros com precificação inteligente</p>
      </footer>
    </div>
  )
}

export default Dashboard
