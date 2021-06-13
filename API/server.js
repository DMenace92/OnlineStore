const express = require('express');
require('./config/db')
const userRouter = require('./routers/user')
// const privRouter = require('./middleWare/privileges')
const productRouter = require('./routers/product')
const app = express();
const PORT = process.env.PORT || 9000
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
// app.use(privRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
