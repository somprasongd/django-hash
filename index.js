const crypto = require('crypto');

const digest = 'sha256';
const iterations = 100000;
const keyLength = 32;
const saltSize = 8;

exports.hash = password => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(saltSize, (error, salt) => {
      if (error) {
        return reject(error);
      }
      salt = Buffer.from(salt).toString('base64')
      crypto.pbkdf2(password, salt, iterations, keyLength, digest, (error, derivedKey) => {
        if (error) {
          return reject(error);
        }
        resolve(`pbkdf2_${digest}$${iterations}$${salt}$${derivedKey.toString('base64')}`);
      });
    });
  });
};

exports.verify = (password, hash) => {
  return new Promise((resolve, reject) => {
    try {
      const arrHash = hash.split('$');

      const digest = arrHash[0].split('_')[1];
      const iterations = +arrHash[1]; // number
      const salt = arrHash[2];
      const key = arrHash[3];

      crypto.pbkdf2(password, salt, iterations, keyLength, digest, (error, derivedKey) => {
        if (error) {
          return reject(error);
        }
        resolve(derivedKey.toString('base64') === key);
      });
    } catch (error) {
      return reject(error);
    }
  });
};