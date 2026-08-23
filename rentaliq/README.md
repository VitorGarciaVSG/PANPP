# RentalIQ - Dynamic Pricing System for Vacation Rentals

RentalIQ é uma plataforma SaaS avançada de precificação dinâmica para aluguéis de temporada, integrando Airbnb e Booking.com com IA para otimizar preços e maximizar receitas.

## 🎯 Features

- **Autenticação JWT** - Registro e login seguros
- **Dashboard em Tempo Real** - Métricas de ocupação e receita
- **IA para Precificação** - Sugestões inteligentes de preços
- **Integração Airbnb** - Sincronize reservas automaticamente
- **Integração Booking.com** - Gerenciamento de listings
- **Análise de Ocupação** - Taxa de ocupação por período
- **Histórico de Reservas** - Acompanhe todas as bookings
- **Estratégias Flexíveis** - AGGRESSIVE, BALANCED, CONSERVATIVE

## 🏗️ Arquitetura

```
rentaliq/
├── backend/
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & validators
│   │   └── index.js      # Express server
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── context/      # State management
    │   ├── pages/        # Page components
    │   └── App.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Instalação e Setup

### Backend

```bash
cd rentaliq/backend
npm install

# Criar .env
cp .env.example .env

# Configurar variáveis
# PORT=5001
# MONGODB_URI=mongodb://localhost:27017/rentaliq
# JWT_SECRET=seu_secret_aqui

# Iniciar servidor
npm run dev
```

### Frontend

```bash
cd rentaliq/frontend
npm install

# Iniciar dev server
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## 📋 API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário
- `PATCH /api/auth/update-strategy` - Atualizar estratégia de preço
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard/metrics` - Métricas gerais
- `GET /api/dashboard/pricing-suggestions` - Sugestões de preço via IA
- `GET /api/dashboard/bookings` - Histórico de reservas

## 🗄️ Banco de Dados

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  company: String,
  plan: 'FREE' | 'PRO' | 'ENTERPRISE',
  pricingStrategy: 'AGGRESSIVE' | 'BALANCED' | 'CONSERVATIVE',
  airbnbConnected: Boolean,
  airbnbAccessToken: String,
  bookingConnected: Boolean,
  bookingAccessToken: String
}
```

## 🔐 Segurança

- Senhas hasheadas com bcryptjs
- JWT tokens com expiração de 7 dias
- CORS habilitado apenas para frontend autorizado
- Validação de entrada em todos os endpoints

## 💳 Planos de Preço

| Plano | Preço | Propriedades | Features |
|-------|-------|--------------|----------|
| FREE | Grátis | 1 | Análise básica |
| PRO | R$ 149/mês | 5 | IA avançada + sugestões |
| ENTERPRISE | Personalizado | Ilimitado | Suporte 24/7 + API |

## 📦 Dependências Principais

**Backend:**
- express: Framework HTTP
- mongoose: ODM para MongoDB
- jsonwebtoken: Autenticação JWT
- bcryptjs: Hash de senhas
- axios: HTTP client
- date-fns: Manipulação de datas

**Frontend:**
- react: UI library
- react-router-dom: Roteamento
- zustand: State management
- axios: HTTP client
- date-fns: Formatação de datas

## 🤖 IA para Precificação

O sistema utiliza ML para análise de:
- Sazonalidade
- Demanda histórica
- Eventos e feriados
- Concorrência local
- Padrões de booking

Estratégias disponíveis:
- **AGGRESSIVE**: +15-20% acima da sugestão (altas demandas)
- **BALANCED**: Preço sugerido pela IA (recomendado)
- **CONSERVATIVE**: -10-15% (baixa sazonalidade)

## 🔄 Roadmap

### Phase 1 ✅
- [x] Autenticação completa
- [x] Frontend com React Router

### Phase 2
- [ ] Model de Propriedades
- [ ] Model de Reservas
- [ ] Dashboard com dados reais

### Phase 3
- [ ] Integração Airbnb
- [ ] Integração Booking.com
- [ ] Sincronização em tempo real

### Phase 4
- [ ] ML server para previsões
- [ ] Engine de precificação
- [ ] Análises avançadas

### Phase 5
- [ ] Stripe payment
- [ ] Sistema de subscrições

### Phase 6
- [ ] Deploy Vercel (frontend)
- [ ] Deploy Railway (backend)

## 📝 Exemplo de Uso

1. Acesse `http://localhost:3001`
2. Clique em "Registre-se aqui"
3. Preencha os dados (nome, email, telefone, empresa)
4. Selecione estratégia de preço
5. Faça login
6. Acesse o dashboard para ver sugestões de preço

## 📊 Estrutura do Dashboard

- **Taxa de Ocupação**: % de dias alugados no mês
- **Receita Total**: Soma de todas as reservas
- **Preço Médio/Noite**: Média de preço cobrado
- **Total de Reservas**: Número de bookings
- **Sugestões de Preço**: Análise IA em tempo real
- **Histórico de Reservas**: Todas as bookings próximas

## 🤝 Contribuindo

Este é um projeto SaaS closed-source. Não aceitamos contribuições externas.

## 📄 Licença

Proprietary - Todos os direitos reservados.

---

Desenvolvido com ❤️ para proprietários de imóveis de temporada
