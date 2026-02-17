#!/bin/bash

# 🚀 Script de Configuração do Git para Checkout de Pagamentos

echo "=========================================="
echo "  🚀 Git Setup - Checkout Pagamentos"
echo "=========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na pasta raiz do projeto${NC}"
    echo "   cd /mnt/okcomputer/output/app"
    exit 1
fi

# 1. Inicializar Git
echo -e "${YELLOW}📦 Inicializando repositório Git...${NC}"
git init
git branch -m main
echo -e "${GREEN}✅ Repositório inicializado!${NC}"
echo ""

# 2. Configurar usuário (se não configurado)
echo -e "${YELLOW}👤 Configurando usuário Git...${NC}"
read -p "Digite seu nome (para commits): " git_name
read -p "Digite seu email: " git_email

git config user.name "$git_name"
git config user.email "$git_email"
echo -e "${GREEN}✅ Usuário configurado!${NC}"
echo ""

# 3. Verificar .gitignore
echo -e "${YELLOW}🔒 Verificando arquivos sensíveis...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .gitignore está configurado para ignorar .env${NC}"
else
    echo -e "${YELLOW}⚠️  Criando arquivo .env.example...${NC}"
fi
echo ""

# 4. Adicionar arquivos
echo -e "${YELLOW}📁 Adicionando arquivos ao Git...${NC}"
git add .
echo -e "${GREEN}✅ Arquivos adicionados!${NC}"
echo ""

# 5. Mostrar status
echo -e "${YELLOW}📋 Verificando status...${NC}"
git status
echo ""

# 6. Fazer commit
echo -e "${YELLOW}💾 Criando commit inicial...${NC}"
git commit -m "🎉 Initial commit: Checkout de Pagamentos com Mercado Pago

- Frontend React + TypeScript + Tailwind CSS
- Backend Node.js + Express
- Integração completa com Mercado Pago
- Suporte a cartões de débito
- Documentação completa"
echo -e "${GREEN}✅ Commit criado!${NC}"
echo ""

# 7. Configurar remote
echo -e "${YELLOW}🔗 Configurando repositório remoto...${NC}"
echo ""
echo "📌 Crie um repositório em: https://github.com/new"
echo "   (NÃO inicialize com README)"
echo ""
read -p "Cole a URL do seu repositório GitHub: " repo_url

git remote add origin "$repo_url"
echo -e "${GREEN}✅ Repositório remoto configurado!${NC}"
echo ""

# 8. Push
echo -e "${YELLOW}🚀 Enviando para o GitHub...${NC}"
git push -u origin main
echo ""

# 9. Sucesso!
echo "=========================================="
echo -e "${GREEN}  ✅ SUCESSO! Projeto no GitHub!${NC}"
echo "=========================================="
echo ""
echo "📍 Repositório: $repo_url"
echo ""
echo "⚠️  LEMBRE-SE:"
echo "   - Os arquivos .env NÃO foram enviados (segurança)"
echo "   - Configure as variáveis no servidor de deploy"
echo ""
echo "📚 Próximos passos:"
echo "   1. Configure as credenciais no servidor"
echo "   2. Deploy do backend"
echo "   3. Deploy do frontend"
echo ""
