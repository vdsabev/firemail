const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const config = functions.config();
if (!config.email) throw new Error(`Invalid email config: ${config.email}`);

const { recipient, sender, password } = config.email;
if (!recipient) throw new Error(`Invalid recipient: ${recipient}`);
if (!sender) throw new Error(`Invalid sender: ${sender}`);
if (!password) throw new Error(`Invalid password: ${password}`);

firebase.initializeApp(config.firebase);

const smtpServerUrlTemplate = config.email.smtpServerUrlTemplate || 'smtps://${email}:${password}@smtp.gmail.com';
const smtpServerUrl = smtpServerUrlTemplate.replace('${email}', sender).replace('${password}', password);
if (!smtpServerUrl) throw new Error(`Invalid smtpServerUrl: ${smtpServerUrl}`);

const mailer = nodemailer.createTransport(smtpServerUrl);

exports.sendEmail = functions.https.onRequest((req, res) => {
  // TODO: Add an option to restrict function to only accept requests from the same domain

  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { subject, text } = req.body;
  if (!subject) return res.status(400).send(`Invalid subject: ${subject}`);
  if (!text) return res.status(400).send(`Invalid text: ${text}`);

  mailer.sendMail({ from: sender, to: recipient, subject, text })
    .catch((error) => res.status(400).send(error && error.message || error))
    .then(() => res.status(200).send('OK'));
});
