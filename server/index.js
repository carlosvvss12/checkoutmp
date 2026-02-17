const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Mercado Pago
// IMPORTANTE: Substitua pela sua chave de acesso real do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-0000000000000000-000000-0000000000000000-000000000'
});

const payment = new Payment(client);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor está funcionando!' });
});

// Rota para processar pagamento com cartão de débito
app.post('/api/process-payment', async (req, res) => {
  try {
    const {
      transaction_amount,
      token,
      description,
      installments,
      payment_method_id,
      issuer_id,
      payer,
      notification_url
    } = req.body;

    // Validação dos campos obrigatórios
    if (!transaction_amount || !token || !payment_method_id || !payer) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
        details: 'transaction_amount, token, payment_method_id e payer são obrigatórios'
      });
    }

    // Criar o body do pagamento
    const paymentBody = {
      transaction_amount: Number(transaction_amount),
      token: token,
      description: description || 'Pagamento com cartão de débito',
      installments: Number(installments) || 1,
      payment_method_id: payment_method_id,
      issuer_id: issuer_id,
      payer: {
        email: payer.email,
        identification: payer.identification,
        first_name: payer.first_name,
        last_name: payer.last_name
      },
      notification_url: notification_url || `${req.protocol}://${req.get('host')}/api/webhook`
    };

    console.log('Processando pagamento:', {
      ...paymentBody,
      token: '***MASKED***'
    });

    // Criar o pagamento no Mercado Pago
    const response = await payment.create({ body: paymentBody });

    console.log('Resposta do Mercado Pago:', response);

    // Retornar resposta formatada
    res.json({
      success: true,
      id: response.id,
      status: response.status,
      status_detail: response.status_detail,
      transaction_amount: response.transaction_amount,
      date_created: response.date_created,
      payment_method_id: response.payment_method_id,
      payment_type_id: response.payment_type_id,
      description: response.description,
      payer: response.payer,
      point_of_interaction: response.point_of_interaction
    });

  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erro ao processar pagamento',
      message: error.message,
      details: error.cause || error
    });
  }
});

// Rota para consultar status do pagamento
app.get('/api/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await payment.get({ id });
    
    res.json({
      success: true,
      payment: response
    });
  } catch (error) {
    console.error('Erro ao consultar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao consultar pagamento',
      message: error.message
    });
  }
});

// Rota para obter métodos de pagamento disponíveis
app.get('/api/payment-methods', async (req, res) => {
  try {
    // Lista de métodos de pagamento comuns no Brasil para cartão de débito
    const paymentMethods = [
      {
        id: 'visa',
        name: 'Visa',
        payment_type_id: 'debit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-xl@2x.png'
      },
      {
        id: 'master',
        name: 'Mastercard',
        payment_type_id: 'debit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-xl@2x.png'
      },
      {
        id: 'elo',
        name: 'Elo',
        payment_type_id: 'debit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-xl@2x.png'
      },
      {
        id: 'hipercard',
        name: 'Hipercard',
        payment_type_id: 'debit_card',
        thumbnail: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-xl@2x.png'
      }
    ];

    res.json({
      success: true,
      payment_methods: paymentMethods
    });
  } catch (error) {
    console.error('Erro ao obter métodos de pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao obter métodos de pagamento',
      message: error.message
    });
  }
});

// Webhook para receber notificações do Mercado Pago
app.post('/api/webhook', (req, res) => {
  console.log('Webhook recebido:', req.body);
  
  const { type, data } = req.body;
  
  if (type === 'payment') {
    console.log(`Pagamento ${data.id} atualizado`);
    // Aqui você pode implementar lógica para atualizar o status no banco de dados
  }
  
  res.status(200).send('OK');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 API de pagamentos: http://localhost:${PORT}/api/process-payment`);
});
