/**
* FetchTimeoutError; Error for fetch timeouts
* @param {String} message The error message
*/
class FetchTimeoutError extends Error {
  constructor(message) {
    super(message || 'fetch request timeout')
    this.name = 'FetchTimeoutError'
  }
}

export default FetchTimeoutError
