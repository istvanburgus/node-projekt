// utils/logger.js

// Info-tason viestit (normaali lokitus)
const info = (...params) => {
  console.log(...params)
}

// Virheilmoitukset
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}