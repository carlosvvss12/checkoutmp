# 🚀 Guia Completo - Subir para o Git

## ⚠️ IMPORTANTE: Segurança das Credenciais

Os arquivos `.gitignore` já estão configurados para **NUNCA** subir suas credenciais do Mercado Pago!

Arquivos ignorados:
- `.env` (credenciais reais)
- `server/.env` (credenciais do backend)
- `node_modules/` (dependências)

---

## 📋 Passo a Passo

### 1. Inicializar o Repositório Git

```bash
cd /mnt/okcomputer/output/app
git init
git branch -m main
```

### 2. Configurar seu usuário Git (se ainda não configurou)

```bash
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

### 3. Adicionar todos os arquivos

```bash
git add .
```

### 4. Verificar o que vai ser commitado

```bash
git status
```

Você deve ver algo como:
```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .env.example
        new file:   .gitignore
        new file:   README.md
        new file:   index.html
        new file:   package.json
        ...
```

**⚠️ Importante:** Os arquivos `.env` NÃO devem aparecer aqui!

### 5. Fazer o primeiro commit

```bash
git commit -m "🎉 Initial commit: Checkout de Pagamentos com Mercado Pago

- Frontend React + TypeScript + Tailwind CSS
- Backend Node.js + Express
- Integração completa com Mercado Pago
- Suporte a cartões de débito
- Documentação completa"
```

### 6. Criar repositório no GitHub/GitLab

Vá para https://github.com/new e crie um novo repositório.

**NÃO** inicialize com README (já temos um).

### 7. Conectar ao repositório remoto

```bash
# Substitua pelo seu URL do GitHub
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
```

### 8. Enviar para o GitHub

```bash
git push -u origin main
```

---

## 🔐 Configurar Credenciais no Servidor (Deploy)

Após fazer o deploy, você precisa configurar as variáveis de ambiente no servidor:

### Opção 1: Vercel (Frontend)
1. Vá em Settings → Environment Variables
2. Adicione:
   - `VITE_API_URL` = URL do seu backend
   - `VITE_MERCADO_PAGO_PUBLIC_KEY` = sua Public Key

### Opção 2: Railway/Render/Heroku (Backend)
1. Vá em Variables/Config Vars
2. Adicione:
   - `MERCADO_PAGO_ACCESS_TOKEN` = seu Access Token
   - `PORT` = 3001

### Opção 3: Servidor VPS (SSH)
```bash
# No servidor
export MERCADO_PAGO_ACCESS_TOKEN="seu_token_aqui"
export PORT=3001
```

---

## 📁 Estrutura dos Arquivos de Ambiente

### `.env.example` (✅ Vai pro Git)
```env
VITE_API_URL=http://localhost:3001/api
VITE_MERCADO_PAGO_PUBLIC_KEY=TEST-00000000-0000-0000-0000-000000000000
```

### `.env` (❌ NUNCA vai pro Git)
```env
VITE_API_URL=http://localhost:3001/api
VITE_MERCADO_PAGO_PUBLIC_KEY=SUA_CHAVE_REAL_AQUI
```

### `server/.env.example` (✅ Vai pro Git)
```env
MERCADO_PAGO_ACCESS_TOKEN=TEST-0000000000000000-000000-0000000000000000-000000000
PORT=3001
```

### `server/.env` (❌ NUNCA vai pro Git)
```env
MERCADO_PAGO_ACCESS_TOKEN=SEU_TOKEN_REAL_AQUI
PORT=3001
```

---

## 🔄 Comandos Úteis do Git

```bash
# Ver status
git status

# Ver histórico de commits
git log --oneline

# Ver o que foi alterado
git diff

# Adicionar arquivo específico
git add src/App.tsx

# Desfazer alterações não commitadas
git checkout -- nome-do-arquivo

# Criar nova branch
git checkout -b minha-feature

# Trocar de branch
git checkout main

# Atualizar do repositório remoto
git pull origin main
```

---

## 🆘 Problemas Comuns

### "Arquivo .env foi commitado por engano!"
```bash
# Remover do Git mas manter no disco
git rm --cached .env
git rm --cached server/.env
git commit -m "Remove .env files"
```

### "Quero mudar a mensagem do último commit"
```bash
git commit --amend -m "Nova mensagem"
```

### "Preciso adicionar arquivo que esqueci no último commit"
```bash
git add arquivo-esquecido.txt
git commit --amend --no-edit
```

---

## ✅ Checklist Antes do Push

- [ ] `.env` está no `.gitignore`
- [ ] `server/.env` está no `.gitignore`
- [ ] `node_modules/` está no `.gitignore`
- [ ] `git status` não mostra arquivos sensíveis
- [ ] Commit tem mensagem descritiva
- [ ] Código está funcionando localmente

---

## 📚 Recursos

- [Git Cheat Sheet](https://git-scm.com/docs/gittutorial)
- [GitHub Docs](https://docs.github.com/pt)
- [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
