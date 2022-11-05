import { Router } from 'express'
import { PizzasBusiness } from '../business/PizzasBusiness'
import { PizzasController } from '../controller/PizzasController'
import { PizzasDatabase } from '../database/PizzaDataBase'
import { IdGenerator } from '../services/IdGenerator'

export const pizzasRouter = Router()

const pizzasController = new PizzasController(
    new PizzasBusiness(
        new PizzasDatabase()
    )
)

pizzasRouter.get("/all", pizzasController.allPizzasController)


