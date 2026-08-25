# 🚀 Guia de Deployment - Evento Desportivo CAESB

## Visão Geral

Este documento descreve como colocar o site do Evento Desportivo no ar usando FTP e configurar o banco de dados MySQL.

## 📋 Pré-requisitos

Você já deve ter recebido:
- **Host FTP**: `ftp.beige-cat-184405.hostingersite.com`
- **Usuário FTP**: `u880459407.panpp`
- **Senha FTP**: `22Panpp2-` (confira sua mensagem anterior)
- **Porta FTP**: 21
- **Banco de Dados**: `u880459407_campeonato`

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Instalar Dependências
```bash
npm install
```

### 1.2 Compilar o Projeto
```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos prontos para deployment.

### 1.3 Verificar Arquivos Gerados
```bash
ls -la dist/
```

Você deve ver:
- `index.html`
- `assets/` (pasta com JS e CSS)

## 🗄️ Passo 2: Configurar o Banco de Dados

### 2.1 Acessar o Painel de Controle

1. Faça login no seu painel de hospedagem (Hostinger)
2. Acesse a seção de **MySQL** ou **Banco de Dados**
3. Procure pela opção **phpMyAdmin**

### 2.2 Criar o Banco de Dados

1. Clique em "Novo" ou "Criar Banco de Dados"
2. Digite o nome: `u880459407_campeonato`
3. Selecione charset: `utf8mb4`
4. Clique em criar

### 2.3 Executar o SQL Schema

1. No phpMyAdmin, selecione o banco `u880459407_campeonato`
2. Clique na aba **SQL**
3. Copie todo o conteúdo do arquivo `database.sql`
4. Cole na caixa de texto
5. Clique em **Executar**

Isso criará todas as tabelas necessárias:
- `categorias` - Lista de categorias do evento
- `inscritos` - Inscrições dos participantes
- `jogos` - Registros das partidas
- `ranking` - Posições no ranking
- `datas_importantes` - Datas do evento
- `usuarios_admin` - Usuários administradores

### 2.4 Criar Usuário Admin

1. No phpMyAdmin, vá para a aba **SQL**
2. Execute este comando (altere a senha):

```sql
INSERT INTO usuarios_admin (usuario, senha, email) VALUES 
('admin', PASSWORD('sua_senha_super_segura_aqui'), 'admin@caesb.com');
```

## 📤 Passo 3: Upload via FTP

### Opção 1: Usando FileZilla (Recomendado)

1. **Baixe e instale** o [FileZilla](https://filezilla-project.org/)

2. **Abra FileZilla** e acesse o menu **Arquivo → Gerenciador de Sites**

3. **Crie uma nova conexão:**
   - Nome do site: `PANPP`
   - Protocolo: FTP
   - Host: `ftp.beige-cat-184405.hostingersite.com`
   - Porta: 21
   - Tipo de autenticação: Normal
   - Usuário: `u880459407.panpp`
   - Senha: `22Panpp2-`
   - Clique em **Conectar**

4. **Navegue para a pasta remota** `/public_html`

5. **Faça upload dos arquivos:**
   - Arraste todos os arquivos da pasta `dist/` para `/public_html`
   - Renomeie `index.html` para `index.html` (já tem este nome)

### Opção 2: Usando Terminal (Linux/Mac)

```bash
# Instalar ftp (se não tiver)
# macOS: brew install lftp
# Linux: sudo apt-get install lftp

# Conectar e fazer upload
lftp -u u880459407.panpp,22Panpp2- ftp.beige-cat-184405.hostingersite.com

# Dentro do lftp:
> cd public_html
> mirror -R dist/ .
> quit
```

### Opção 3: Script Automático (Node.js)

1. Instale o módulo FTP:
```bash
npm install ftp
```

2. Crie o arquivo `deploy.js`:
```javascript
const fs = require('fs');
const path = require('path');
const FTPClient = require('ftp');

const client = new FTPClient();

const config = {
  host: 'ftp.beige-cat-184405.hostingersite.com',
  user: 'u880459407.panpp',
  password: '22Panpp2-',
  port: 21
};

client.on('ready', () => {
  uploadDirectory('./dist', '/public_html', () => {
    client.end();
    console.log('✓ Upload concluído com sucesso!');
  });
});

function uploadDirectory(localPath, remotePath, callback) {
  fs.readdir(localPath, (err, files) => {
    if (err) throw err;
    
    let count = 0;
    files.forEach(file => {
      const filePath = path.join(localPath, file);
      const remoteFilePath = `${remotePath}/${file}`;
      
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        
        if (stats.isDirectory()) {
          client.mkdir(remoteFilePath, (err) => {
            uploadDirectory(filePath, remoteFilePath, () => {
              count++;
              if (count === files.length) callback();
            });
          });
        } else {
          client.put(filePath, remoteFilePath, (err) => {
            if (err) throw err;
            count++;
            console.log(`✓ ${remoteFilePath}`);
            if (count === files.length) callback();
          });
        }
      });
    });
  });
}

client.connect(config);
```

3. Execute:
```bash
node deploy.js
```

## ✅ Passo 4: Verificar o Site

1. Abra seu navegador
2. Acesse: `https://seu-dominio.com`
3. Você deve ver a página inicial do Evento Desportivo

## 🔐 Passo 5: Segurança

### 5.1 Alterar Senha de Admin
1. Acesse o painel de admin
2. Vá para Configurações
3. Altere a senha padrão para uma senha forte

### 5.2 Proteger Arquivo .env
- Nunca faça upload do arquivo `.env` real para o servidor
- Use sempre `.env.local` para dados sensíveis localmente
- Configure variáveis de ambiente no painel de hospedagem

### 5.3 Configurar HTTPS
- A maioria dos hosts modernos fornece HTTPS grátis
- No painel Hostinger, ative SSL/TLS
- Force HTTPS redirecionando HTTP para HTTPS

## 🐛 Troubleshooting

### Erro: "Conexão FTP recusada"
- Verifique host, usuário e senha
- Certifique-se de que a porta 21 está aberta
- Tente em uma rede diferente (às vezes redes corporativas bloqueiam FTP)

### Erro: "Banco de dados não encontrado"
- Verifique se o banco foi criado no painel
- Confirme o nome exato do banco: `u880459407_campeonato`
- Tente criar manualmente via phpMyAdmin

### Página branca ao acessar
- Verifique se `index.html` está em `/public_html`
- Abra o DevTools (F12) e verifique erros no console
- Verifique os logs do servidor

### Inscrições não salvam
- Confirme que o banco de dados está configurado
- Verifique permissões de escrita no servidor
- Consulte logs de erro do servidor

## 📞 Suporte

Para dúvidas sobre:
- **FTP/Hosting**: Contate Hostinger
- **Banco de Dados**: Verifique phpMyAdmin
- **Desenvolvimento**: Abra uma issue no repositório

## 🎉 Pronto!

Seu site está no ar! Agora você pode:
1. Gerenciar inscrições via painel admin
2. Acompanhar classificações
3. Registrar resultados dos jogos

Boa sorte com o evento! 🏆
