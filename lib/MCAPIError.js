module.exports = class MCAPIError extends Error {
  constructor(http_code, ...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MCAPIError)
    }
    this.code = http_code
    this.date = new Date()
  }
}
