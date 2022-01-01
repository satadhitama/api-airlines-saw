const app = require('./App')

app.start()

process.on('SIGINT', async () => {
  await app.stop()
})