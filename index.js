const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();

// Configuração do Nodemailer com o Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com', // Substitua pelo seu e-mail
    pass: 'YOUR_PASSWORD' // Substitua pela sua senha do aplicativo
  }
});

exports.sendErrorReport = functions.firestore
  .document('errorReports/{reportId}')
  .onCreate((snap, context) => {
    const report = snap.data();

    const mailOptions = {
      from: 'YOUR_EMAIL@gmail.com',
      to: 'YOUR_GMAIL@gmail.com', // E-mail para onde o relatório será enviado
      subject: 'Novo Relatório de Erro',
      text: `Descrição do erro: ${report.description}\n\nTimestamp: ${report.timestamp}`
    };

    return transporter.sendMail(mailOptions)
      .then(() => console.log('E-mail enviado com sucesso!'))
      .catch(error => console.error('Erro ao enviar e-mail:', error));
  });
