const firebase = require('firebase-admin');
const functions = require('firebase-functions');

const config = functions.config();
firebase.initializeApp(config.firebase);

const sendEmail = require('./sendEmail');
exports.sendEmail = functions.https.onRequest(sendEmail({ config: config.email }));
