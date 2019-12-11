'use strict'

const assert = require('assert').strict

assert(
  process.env.ALLOWED_HOSTNAME,
  'express-one-hostname requires ALLOWED_HOSTNAME to be set in the environment'
)

const allowedHostname = process.env.ALLOWED_HOSTNAME

module.exports = (req, res, next) => {
  if (req.hostname === allowedHostname) return next()
  res.redirect(301, `${req.protocol}://${allowedHostname}${req.originalUrl}`)
}
