# 📤 Instruções de Upload - Para Fazer do Seu PC

Como o ambiente remoto tem restrições de rede, criei um **script Python** que você pode executar **no seu PC** para fazer o upload!

---

## ✅ Pré-requisitos

1. **Python 3** instalado no seu PC
   - Windows: https://python.org/downloads
   - Mac/Linux: geralmente já tem instalado

2. **Projeto compilado**
   ```bash
   npm run build
   ```
   Isso cria a pasta `dist/` com os arquivos prontos

---

## 🚀 Como Fazer o Upload

### Passo 1: Abra o Terminal/Prompt de Comando

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter

**Mac/Linux:**
- Abra o Terminal

### Passo 2: Navegue até a Pasta do Projeto

```bash
cd /caminho/para/PANPP
```

Exemplo:
```bash
# Windows
cd C:\Users\SeuUsuario\Desktop\PANPP

# Mac
cd ~/Desktop/PANPP

# Linux
cd ~/PANPP
```

### Passo 3: Execute o Script

```bash
python3 upload-local.py
```

Pronto! O script vai:
1. ✅ Conectar ao servidor FTP
2. ✅ Fazer login com suas credenciais
3. ✅ Enviar todos os arquivos da pasta `dist/`
4. ✅ Mostrar progresso em tempo real

---

## 📊 O que Vai Acontecer

```
================================================== 
🚀 UPLOAD FTP - EVENTO DESPORTIVO CAESB
================================================== 

ℹ Diretório local: ./dist
ℹ Host FTP: ftp.beige-cat-184405.hostingersite.com
ℹ Usuário: u880459407.panpp
ℹ Diretório remoto: /public_html

📡 Conectando ao servidor FTP...
✓ Conectado ao servidor FTP!

🔐 Fazendo login...
✓ Login realizado com sucesso!

📂 Navegando para /public_html...
✓ Estou em: /public_html

📤 Iniciando upload dos arquivos...
⚠ Isso pode levar alguns minutos...

ℹ Enviando: /public_html/index.html
✓ Arquivo enviado: index.html

ℹ Enviando: /public_html/assets/index-DCLMqFdJ.js
✓ Arquivo enviado: index-DCLMqFdJ.js

================================================== 
✅ UPLOAD CONCLUÍDO COM SUCESSO!
================================================== 

✓ Todos os arquivos foram enviados!
ℹ Seu site está no ar em alguns segundos...
ℹ Acesse: https://seu-dominio.com
```

---

## 🐛 Troubleshooting

### Erro: "Python não encontrado"
```bash
# Windows - tente:
python upload-local.py

# Ou verifique a instalação
python --version
```

### Erro: "Pasta dist não encontrada"
```bash
# Execute primeiro:
npm install
npm run build
```

### Erro: "Connection refused" ou "Timeout"
- Verifique sua conexão com internet
- Tente novamente em alguns minutos
- Verifique se usuário/senha estão corretos

### Erro: "Permission denied"
- Verifique permissões do usuário FTP
- Contate suporte Hostinger

---

## ✨ Após o Upload

### 1. Verificar o Site
```
https://seu-dominio.com
```

Se você vir a página inicial do evento, está funcionando! ✅

### 2. Configurar Banco de Dados
1. Painel Hostinger → phpMyAdmin
2. Crie banco: `u880459407_campeonato`
3. Execute o arquivo `database.sql`
4. Crie usuário admin

### 3. Acessar Painel Admin
```
https://seu-dominio.com (clique em "Admin")
```

---

## 📞 Precisa de Ajuda?

1. Verifique a documentação: `DEPLOYMENT.md`
2. Veja o guia rápido: `SETUP_QUICK.md`
3. Leia o README: `README.md`

---

**Tudo pronto! Basta executar o script e seu site estará no ar!** 🚀

