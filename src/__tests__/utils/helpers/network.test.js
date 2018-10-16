import { checkStatus, fetchWithTimeout } from '../../../utils/helpers/network'
import FetchTimeoutError from '../../../utils/errors/FetchTimeoutError'
import {
  REQUEST_TIMEOUT,
} from '../../../utils/constants'

jest.useFakeTimers()

describe('checkStatus', () => {
  it('resolves the promise if the response status code is at the low end of the 200 range', () => checkStatus({ status: 200 })
    .then((response) => {
      expect(response).toEqual({ status: 200 })
    }))
  it('resolves the promise if the response status code is at the high end of the 200 range', () => checkStatus({ status: 299 })
    .then((response) => {
      expect(response).toEqual({ status: 299 })
    }))
  it('rejects the promise if the response status code is not within the 200 range', () => {
    // to be sure that `Promise` rejected and `expect` has been called once
    expect.assertions(1)
    return checkStatus({ status: 404 })
      .catch((response) => {
        expect(response).toEqual({ status: 404 })
      })
  })
})

describe('fetchWithTimeout', () => {
  it('resolves when not timing out', () => {
    expect.assertions(1)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())

    const fetchResult = fetchWithTimeout('http://some-url.com/endpoint')
      // Just expect something when the promise resolves
      .then(() => expect(true).toEqual(true))

    return fetchResult
  })

  it('times out request after REQUEST_TIMEOUT period', () => {
    expect.assertions(1)

    window.fetch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      setTimeout(resolve, REQUEST_TIMEOUT + 10)
    }))

    const fetchResult = fetchWithTimeout('http://some-url.com/endpoint')
      .catch(err => expect(err instanceof FetchTimeoutError).toEqual(true))

    jest.runTimersToTime(REQUEST_TIMEOUT + 1)

    return fetchResult
  })
})
