const nodemailer = require('nodemailer');
const { validateObjectValues, validateValue } = require('./utils');

module.exports = ({ config }) => {
  if (!config) throw new Error(`Invalid config: ${config}`);
  validateValue(config, 'config');
  validateObjectValues(config, ['sender', 'password']);

  const { sender, recipient, alias, password } = config;
  const smtpServerUrlTemplate = config.smtpServerUrlTemplate || 'smtps://${email}:${password}@smtp.gmail.com';
  const smtpServerUrl =
    smtpServerUrlTemplate
      .replace('${email}', encodeURIComponent(sender))
      .replace('${password}', encodeURIComponent(password));

  validateValue(smtpServerUrl, 'smtpServerUrl');

  const mailer = nodemailer.createTransport(smtpServerUrl);

  return (req, res) => {
    // TODO: Add an option to throttle function (perhaps by IP) to avoid spam
    // TODO: Add an option to restrict function to only accept requests from the same domain

    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { subject, text } = req.body;
    if (!subject) return res.status(400).send(`Invalid subject: ${subject}`);
    if (!text) return res.status(400).send(`Invalid text: ${text}`);

    mailer.sendMail({ from: alias || sender, to: recipient || sender, subject, text })
      .catch((error) => res.status(400).send(error && error.message || error))
      .then(() => res.status(200).send('OK'));
  };
};
