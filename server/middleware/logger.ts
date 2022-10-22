export default defineEventHandler((event) => {
  console.log('[Middleware][Logger2] Called url: ' + event.req.url)
})
