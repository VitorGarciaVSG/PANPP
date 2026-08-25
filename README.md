# 🏆 Evento Desportivo CAESB

Sistema web completo para gerenciar um campeonato desportivo com inscrições, classificações e ranking de participantes.

## ✨ Funcionalidades

### 🏠 Página Inicial
- Informações sobre o evento
- Cronograma de datas (inscrições, fases, final)
- Display de todas as 8 categorias
- Design responsivo e atrativo

### 📝 Sistema de Inscrição
- Formulário simples e intuitivo
- Campos: Nome, Email, Telefone, Categoria, Equipe
- Validação de dados
- Confirmação de inscrição

### 📊 Painel Administrativo
- Visualizar todas as inscrições
- Filtrar por categoria e status
- Alterar status de inscritos (Pendente/Aprovado/Recusado)
- Estatísticas em tempo real
- Exportar dados para CSV (futuro)

### 🎮 Categorias Suportadas
1. ⚽ Futebol
2. 🏓 Ping Pong
3. 🎲 Dominó
4. 🏐 Volei
5. ♟️ Dama
6. ♞ Xadrez
7. 🎱 Sinuca
8. 🃏 Truco

## 🗄️ Banco de Dados

O sistema utiliza MySQL com as seguintes tabelas:
- **categorias** - Lista de categorias do evento
- **inscritos** - Participantes inscritos
- **jogos** - Partidas e resultados
- **ranking** - Classificação por categoria
- **datas_importantes** - Datas do evento
- **usuarios_admin** - Administradores

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Preview do build
npm run preview
```

O site estará disponível em `http://localhost:5173`

### Deployment

#### Opção 1: Deploy com FTP Automático
```bash
# Certifique-se de ter criado .env.local com dados FTP
npm run deploy
```

#### Opção 2: Deploy Manual (FileZilla)
1. Execute `npm run build`
2. Abra FileZilla
3. Conecte ao FTP com os dados fornecidos
4. Faça upload de `dist/` para `/public_html`

Para mais detalhes, veja [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 Configuração

### 1. Variáveis de Ambiente

Copie `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Edite com suas credenciais:
```env
DB_HOST=localhost
DB_USER=u880459407_campeonato
DB_PASSWORD=sua_senha
FTP_HOST=ftp.beige-cat-184405.hostingersite.com
FTP_USER=u880459407.panpp
FTP_PASSWORD=sua_senha
```

### 2. Banco de Dados

Execute o script SQL fornecido:
```sql
-- Em phpMyAdmin, importe o arquivo database.sql
```

Ou via MySQL:
```bash
mysql -h host -u usuario -p database < database.sql
```

### 3. Criar Usuário Admin

```sql
INSERT INTO usuarios_admin (usuario, senha, email) VALUES 
('admin', PASSWORD('sua_senha_super_segura'), 'admin@caesb.com');
```

## 📁 Estrutura do Projeto

```
PANPP/
├── components/
│   ├── HomePage.tsx          # Página inicial
│   ├── RegistrationPage.tsx  # Formulário de inscrição
│   ├── AdminPage.tsx         # Painel administrativo
│   └── ErrorMessage.tsx      # Componente de erros (legado)
├── App.tsx                   # Componente principal
├── index.html                # HTML base
├── package.json              # Dependências
├── vite.config.ts            # Configuração Vite
├── tsconfig.json             # Configuração TypeScript
├── database.sql              # Schema do banco de dados
├── .env.example              # Variáveis de ambiente (exemplo)
├── deploy-ftp.js             # Script de deploy FTP
├── DEPLOYMENT.md             # Guia detalhado de deployment
└── README.md                 # Este arquivo
```

## 🎨 Tecnologias

- **Frontend**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **Deployment**: FTP

## 🔐 Segurança

- ✅ Senhas nunca são expostas em repositório
- ✅ Use `.env.local` para dados sensíveis
- ✅ Ative HTTPS em produção
- ✅ Altere senhas padrão de admin
- ✅ Mantenha backups do banco de dados

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento (hot reload)
npm run build        # Compilar para produção
npm run preview      # Ver resultado do build
npm run deploy       # Compilar e fazer deploy via FTP
npm run deploy:check # Verificar sintaxe do script FTP
```

## 🐛 Troubleshooting

### Porta 5173 já em uso?
```bash
npm run dev -- --port 3000
```

### Erro ao compilar?
```bash
rm -rf node_modules
npm install
npm run build
```

### Problema com FTP?
- Verifique credenciais em `.env.local`
- Teste conexão manualmente com FileZilla
- Veja mais em [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting)

## 📧 Suporte

- 📞 Contate a administração do CAESB
- 🐛 Reporte bugs via GitHub Issues
- 💬 Sugestões de melhorias são bem-vindas!

## 📜 Licença

© 2026 Clube CAESB - Todos os direitos reservados

## 🎉 Créditos

Desenvolvido com ❤️ para o Evento Desportivo CAESB.

---

**Última atualização**: 25 de agosto de 2026

Pronto para começar? Leia [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções de deployment! 🚀
