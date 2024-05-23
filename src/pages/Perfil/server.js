const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Carregar as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configurar o transporte de e-mail com o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.put('/atualizarperfil', (req, res) => {
  const { nome, biografia } = req.body;

  // Processar os dados e atualizar o perfil no banco de dados

  res.json({ success: true, nome, biografia });
});

app.post('/reportarerro', (req, res) => {
  const { errorDescription, email } = req.body;

  // Enviar o e-mail de relatório de erro usando o Nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Coloque aqui o seu e-mail para receber o relatório de erro
    subject: 'Relatório de Erro do Aplicativo',
    text: `Descrição do Erro: ${errorDescription}\nE-mail do Usuário: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ success: false, message: 'Erro ao enviar o relatório de erro por e-mail' });
    } else {
      console.log('E-mail de relatório de erro enviado:', info.response);
      res.json({ success: true, message: 'Relatório de erro enviado com sucesso por e-mail' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
