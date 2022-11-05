import { Pizza } from './../models/Pizzas';
import { PizzasDatabase } from "../database/PizzaDataBase"

export class PizzasBusiness {
    constructor(
        private pizzasDatabase: PizzasDatabase,
    ) { }

    public allPizzasBusiness = async () => {

        const pizzasDB = await this.pizzasDatabase.allPizzasData()

        const allPizzas = pizzasDB.map((pizza)=>{
            return new Pizza(
                pizza.name,
                pizza.price
            )
        })

        for(let pizza of allPizzas){
            const ingredients = await this.pizzasDatabase.IngredientByPizzaData(pizza.getName())
            const format = ingredients.map((ingredient:any)=>  ingredient.ingredient_name)

            pizza.setIngredients(format)

        }
        


            return allPizzas
        }

    }