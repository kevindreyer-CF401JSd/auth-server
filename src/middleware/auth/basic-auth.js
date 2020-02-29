const base64 = require('base-64')
const users = require('../../models/users')

function basicAuth (req, res, next) {

  if (!req.headers.authorization) {
    next('Invalid Login')
    return
  }

  const basic = req.headers.authorization.split(' ').pop();
  const decoded = base64.decode(basic);
  const [username, password] = decoded.split(':');

  users.authenticateBasic(username, password)
    .then(() => {
      next()
    })
    .catch(err => {
      next(err.message)
    })
}

module.exports = basicAuth;