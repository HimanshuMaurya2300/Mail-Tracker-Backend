import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { dbConnect } from './config/db.config'
import dotenv from 'dotenv'
dotenv.config()

import trackMailRoute from './api/track-mail'
import sendMailRoute from './api/send-mail'
import mailStatusRoute from './api/get-mail-status'

const app = new Hono()

app.use(cors())

dbConnect()
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log('Database connection failed', err)
    process.exit(1)
  })


app.route('/track', trackMailRoute)
app.route('/api', sendMailRoute)
app.route('/status', mailStatusRoute)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
