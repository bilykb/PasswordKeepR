'use strict';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text, encryption_key) {
  let hashSubstring = encryption_key.padEnd(32, "0").substring(0, 32);
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(hashSubstring), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, encryption_key) {
  let hashSubstring = encryption_key.padEnd(32, "0").substring(0, 32);
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(hashSubstring), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { decrypt, encrypt };
