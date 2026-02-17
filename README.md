# Checkout de Pagamentos - Mercado Pago

Sistema completo de checkout de pagamentos com integração ao Mercado Pago, suportando cartões de débito.

## 🚀 Tecnologias

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React (ícones)

### Backend
- Node.js + Express
- SDK Mercado Pago
- CORS
- dotenv

## 📁 Estrutura do Projeto

```
app/
├── src/                    # Frontend React
│   ├── sections/           # Componentes de seção
│   │   └── CheckoutForm.tsx
│   ├── hooks/              # Hooks customizados
│   │   └── useMercadoPago.ts
│   ├── services/           # Serviços de API
│   │   └── api.ts
│   ├── types/              # Tipos TypeScript
│   │   └── payment.ts
│   ├── App.tsx
│   └── main.tsx
├── server/                 # Backend Node.js
│   ├── index.js           # Servidor Express
│   ├── package.json
│   └── .env.example
├── dist/                  # Build do frontend
└── package.json
```

## 🛠️ Configuração

### 1. Configurar o Backend

```bash
cd server
cp .env.example .env
# Edite .env e adicione seu Access Token do Mercado Pago
npm install
npm start
```

### 2. Configurar o Frontend

```bash
# Na raiz do projeto
cp .env.example .env
# Edite .env e adicione sua Public Key do Mercado Pago
npm install
npm run dev
```

## 🔑 Credenciais do Mercado Pago

1. Acesse o [Painel de Desenvolvedores](https://www.mercadopago.com.br/developers/panel)
2. Crie uma aplicação
3. Obtenha suas credenciais:
   - **Public Key** (para frontend)
   - **Access Token** (para backend)

### Credenciais de Teste

```
Public Key: TEST-00000000-0000-0000-0000-000000000000
Access Token: TEST-0000000000000000-000000-0000000000000000-000000000
```

## 💳 Cartões de Teste

| Bandeira | Número | Resultado |
|----------|--------|-----------|
| Visa | 4509 9535 6623 3704 | Aprovado |
| Mastercard | 5031 4332 1540 6351 | Aprovado |
| Visa | 4009 1753 3280 6176 | Recusado |

**CVV:** Qualquer (3 dígitos)  
**Validade:** Qualquer data futura

## 📡 API Endpoints

### POST /api/process-payment
Processa um pagamento com cartão de débito.

**Body:**
```json
{
  "transaction_amount": 100.00,
  "token": "card_token_123",
  "description": "Pagamento teste",
  "installments": 1,
  "payment_method_id": "visa",
  "payer": {
    "email": "cliente@email.com",
    "first_name": "João",
    "last_name": "Silva",
    "identification": {
      "type": "CPF",
      "number": "12345678900"
    }
  }
}
```

### GET /api/payment/:id
Consulta o status de um pagamento.

### GET /api/payment-methods
Lista métodos de pagamento disponíveis.

## 🚀 Deploy

### Backend
O backend pode ser deployado em:
- Heroku
- Railway
- Render
- AWS
- Google Cloud

### Frontend
O frontend pode ser deployado em:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 📄 Licença

MIT
