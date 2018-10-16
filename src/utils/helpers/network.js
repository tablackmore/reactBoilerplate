import {
  REQUEST_TIMEOUT,
} from '../constants'
import FetchTimeoutError from '../errors/FetchTimeoutError'

require('es6-promise').polyfill()
require('isomorphic-fetch')

/**
 * Validate response code statuses from API
 * @param  {Object} response sever response data
 * @return {Promise} return the response promise
 */
const checkStatus = (response) => {
  const promise = new Promise((resolve, reject) => {
    // setup policy to fail request with error based response codes.
    if (response.status >= 200 && response.status < 300) {
      resolve(response)
    } else {
      reject(response)
    }
  })
  return promise
}

/**
 * Creates promise for providing timeout on isometric fetch
 * @returns {Promise} Timeout promise
 */
const createFetchTimeout = () => (
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new FetchTimeoutError()), REQUEST_TIMEOUT)
  })
)

/**
 * Make a fetch request but time it out
 * @param {String} fullUrl The url to call
 * @param {Object} request Extra request parameters to pass to fetch
 */
const fetchWithTimeout = (fullUrl, request) => (
  Promise.race([
    fetch(fullUrl, request),
    createFetchTimeout(),
  ])
)

export { checkStatus, fetchWithTimeout }
