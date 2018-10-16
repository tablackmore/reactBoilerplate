import Raven from 'raven-js'
import { SENTRY_URL } from '../constants'
/**
 * Creates a console logger for the client
 */
/* eslint-disable no-console */

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  Raven
    .config(SENTRY_URL)
    .install()
}

const logger = {
  error: (message, context) => {
    console.error(message, context)
    if (isProd) {
      Raven.captureMessage(message, {
        level: 'error',
        extra: context,
      })
    }
  },
  warn: (message, context) => {
    console.warn(message, context)
    if (isProd) {
      Raven.captureMessage(message, {
        level: 'warning',
        extra: context,
      })
    }
  },
  info: (message, context) => {
    if (!isProd) {
      console.info(message, context)
    }
  },
  debug: (message, context) => {
    if (!isProd) {
      console.debug('[debug]', message, context)
    }
  },
  silly: (message, context) => {
    if (!isProd) {
      console.log('[silly]', message, context)
    }
  },
  log: (level, message, context) => {
    if (!isProd) {
      console.log(`[${level}]`, message, context)
    }
  },
}

/**
 * Log uncaught exceptions
 * @param  {String} msg
 * @param  {String} url
 * @param  {Number} lineNo
 * @param  {Number} columnNo
 * @param  {Object} error
 * @return {Boolean}
 */
window.onerror = (msg, url, lineNo, columnNo, error) => {
  logger.error(msg, {
    url, lineNo, columnNo, error,
  })
  return false
}

/* eslint-enable no-console */

export default logger
