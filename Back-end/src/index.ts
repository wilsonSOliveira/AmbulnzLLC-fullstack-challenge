import { orderRouter } from './router/orderRouter';
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"

import { pizzasRouter } from './router/pizzasRouter'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.use("/pizzas", pizzasRouter)
app.use("/order", orderRouter)