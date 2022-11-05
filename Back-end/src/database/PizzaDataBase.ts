import {  IPizzaDB, Pizza } from './../models/Pizzas';
import { BaseDatabase } from "./BaseDatabase"

export class PizzasDatabase extends BaseDatabase {
    public static TABLE_PIZZAS = "Amb_Pizzas"
    public static TABLE_INGREDIENTS = "Amb_Ingredients"
    public static TABLE_PIZZAS_INGREDIENTS = "Amb_Pizzas_Ingredients"


    public allPizzasData  = async (): Promise<IPizzaDB[]> => {
        const result:IPizzaDB[]= await BaseDatabase
            .connection(PizzasDatabase.TABLE_PIZZAS)
            .select()
            


        return result
    }

    public IngredientByPizzaData  = async (pizza: string): Promise<any> => {
        const result = await BaseDatabase
            .connection(PizzasDatabase.TABLE_PIZZAS_INGREDIENTS)
            .select('ingredient_name')
            .where({ pizza_name : pizza})
                
        return result 
    }

}