import app from './src/app.js'
import { connectdb } from './src/db.js'

connectdb()

app.listen(3000)
console.log('Server on port', 3000)
