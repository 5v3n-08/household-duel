// server-middleware/logger.js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (req, res, next) {
  // eslint-disable-next-line no-console
  console.log('[Middleware][Logger2] Called url: ' + req.url)
  next()
}
