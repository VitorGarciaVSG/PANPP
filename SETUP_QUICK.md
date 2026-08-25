# ⚡ Guia Rápido de Setup - 5 Minutos

## 1️⃣ Preparar o Projeto (1 min)

```bash
npm install
cp .env.example .env.local
```

## 2️⃣ Configurar Banco de Dados (2 min)

1. Acesse seu painel Hostinger → MySQL → phpMyAdmin
2. Crie banco: `u880459407_campeonato`
3. Abra aba SQL e copie todo o conteúdo de `database.sql`
4. Cole e clique "Executar"
5. Execute (altere a senha):
```sql
INSERT INTO usuarios_admin (usuario, senha, email) 
VALUES ('admin', PASSWORD('sua_senha_segura'), 'admin@caesb.com');
```

## 3️⃣ Testar Localmente (1 min)

```bash
npm run dev
```

Abra: http://localhost:5173

Você verá:
- ✅ Página inicial com 8 categorias
- ✅ Formulário de inscrição
- ✅ Painel administrativo

## 4️⃣ Fazer Deploy (1 min)

### Opção A: Automático (Recomendado)

```bash
# Edite .env.local com dados FTP:
npm run deploy
```

### Opção B: Manual (FileZilla)

1. Execute: `npm run build`
2. Abra FileZilla
3. Conecte com dados FTP fornecidos
4. Faça upload de `dist/` para `/public_html`

## ✅ Pronto!

Seu site está no ar em: **https://seu-dominio.com**

## 📋 Dados de Acesso

**FTP:**
- Host: `ftp.beige-cat-184405.hostingersite.com`
- Usuário: `u880459407.panpp`
- Senha: `22Panpp2-`
- Diretório: `/public_html`

**Banco de Dados:**
- Servidor: (seu host)
- Banco: `u880459407_campeonato`
- Usuário: (seu usuário)

**Admin:**
- Usuário: `admin`
- Senha: (a que você criou)

## 🎯 Próximos Passos

1. Altere senha admin no painel
2. Customize cores/logos conforme necessário
3. Teste inscrições
4. Configure HTTPS no painel Hostinger

## 📚 Mais Informações

- Detalhes completos: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Estrutura: [README.md](./README.md)

---

Dúvidas? Veja os guias completos! 🚀
