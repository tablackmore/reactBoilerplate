import logger from './helpers/logger'
import { checkStatus, fetchWithTimeout } from './helpers/network'
import { SERVICE_URL } from './constants'

require('es6-promise').polyfill()

const wsCall = (endpoint, request) => {
  logger.info(`Fetching from ${endpoint}`, request)

  return fetchWithTimeout(`${endpoint}`, request)
    .then(checkStatus)
    .then(response => response.json())
}

const getAll = () => wsCall(`${SERVICE_URL}/items`)

const add = item => wsCall(`${SERVICE_URL}/items`, {
  method: 'POST',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(item),
})


export { getAll, add }
