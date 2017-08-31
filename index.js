const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

firebase.initializeApp(functions.config().firebase);

const config = functions.config().email;
if (!config) throw new Error(`Invalid config: ${config}`);

// TODO: Validate config
const { recipient, sender, password } = config;

// TODO: Make SMTP server configurable
const mailer = nodemailer.createTransport(`smtps://${encodeURIComponent(sender)}:${encodeURIComponent(password)}@smtp.gmail.com`);

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
