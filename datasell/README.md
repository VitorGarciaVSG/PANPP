# DataSell - E-commerce Analytics Platform

DataSell é uma plataforma SaaS completa de análise de vendas para e-commerce, integrando Mercado Livre e Shopee com dashboards inteligentes e recomendações baseadas em IA.

## 🎯 Features

- **Autenticação JWT** - Registro e login seguros
- **Dashboard em Tempo Real** - Métricas de vendas e produtos
- **Integração Mercado Libre** - Sincronize produtos e vendas
- **Integração Shopee** - Analise vendas em tempo real
- **Análise de Produtos** - Identifique best-sellers
- **Recomendações de Preço** - IA para otimizar preços
- **Cálculo de Margem de Lucro** - Análise detalhada por produto
- **Planos Flexíveis** - FREE, PRO e ENTERPRISE

## 🏗️ Arquitetura

```
datasell/
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
cd datasell/backend
npm install

# Criar .env
cp .env.example .env

# Configurar variáveis
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/datasell
# JWT_SECRET=seu_secret_aqui

# Iniciar servidor
npm run dev
```

### Frontend

```bash
cd datasell/frontend
npm install

# Iniciar dev server
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📋 API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário
- `POST /api/auth/logout` - Logout

### Dashboard
- `GET /api/dashboard/metrics` - Métricas gerais
- `GET /api/dashboard/sales` - Dados de vendas

## 🗄️ Banco de Dados

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  plan: 'FREE' | 'PRO' | 'ENTERPRISE',
  meliConnected: Boolean,
  meliAccessToken: String,
  shopeeConnected: Boolean,
  shopeeAccessToken: String
}
```

## 🔐 Segurança

- Senhas hasheadas com bcryptjs
- JWT tokens com expiração de 7 dias
- CORS habilitado apenas para frontend autorizado
- Validação de entrada em todos os endpoints

## 💳 Planos de Preço

| Plano | Preço | Produtos | Features |
|-------|-------|----------|----------|
| FREE | Grátis | Até 5 | Análise básica |
| PRO | R$ 99/mês | Até 50 | Análise avançada + IA |
| ENTERPRISE | Personalizado | Ilimitado | API completa + suporte |

## 📦 Dependências Principais

**Backend:**
- express: Framework HTTP
- mongoose: ODM para MongoDB
- jsonwebtoken: Autenticação JWT
- bcryptjs: Hash de senhas
- axios: HTTP client

**Frontend:**
- react: UI library
- react-router-dom: Roteamento
- zustand: State management
- axios: HTTP client

## 🔄 Roadmap

### Phase 1 ✅
- [x] Autenticação completa
- [x] Frontend com React Router

### Phase 2
- [ ] Models de Produtos
- [ ] CRUD de Integração
- [ ] Dashboard com dados reais

### Phase 3
- [ ] Integração Mercado Libre
- [ ] Integração Shopee
- [ ] Sincronização de dados

### Phase 4
- [ ] Sistema de recomendações
- [ ] IA para preços
- [ ] Análises avançadas

### Phase 5
- [ ] Stripe payment
- [ ] Sistema de subscrições

### Phase 6
- [ ] Deploy Vercel (frontend)
- [ ] Deploy Railway (backend)

## 📝 Exemplo de Uso

1. Acesse `http://localhost:3000`
2. Clique em "Registre-se aqui"
3. Preencha os dados
4. Faça login
5. Acesse o dashboard para ver métricas

## 🤝 Contribuindo

Este é um projeto SaaS closed-source. Não aceitamos contribuições externas.

## 📄 Licença

Proprietary - Todos os direitos reservados.

---

Desenvolvido com ❤️ para e-commerce sellers
