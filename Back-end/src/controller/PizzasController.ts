
import { Request, Response } from "express";
import { PizzasBusiness } from "../business/PizzasBusiness";

export class PizzasController {
    constructor(
        private pizzasBusiness: PizzasBusiness
    ) { }


    public allPizzasController = async (req: Request, res: Response) => {
        try {
            
            const response = await this.pizzasBusiness.allPizzasBusiness()

            res.status(201).send(response)
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }


}