const crypto = require('crypto');

const generateSecret = (bytes) => {
  return crypto.randomBytes(bytes).toString('base64');
};

module.exports = {
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-dashboard',
  secret: process.env.SECRET || generateSecret(256),
  cookieSecret: process.env.COOKIESECRET || generateSecret(256)

}