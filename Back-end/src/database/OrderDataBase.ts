import { IOrderDB, IOrderItemDB } from "../models/order"
import { BaseDatabase } from "./BaseDatabase"
import { PizzasDatabase } from "./PizzaDataBase"


export class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "Amb_Orders"
    public static TABLE_ORDER_ITEMS = "Amb_Order_Items"

    public createOrderData = async (id:string )=>{
  await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS)
  .insert({id})
    }

    public insertItemOnOrderData = async (orderItem: IOrderItemDB): Promise<void> => {
        await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDER_ITEMS)
            .insert(orderItem)
    }

    public getPriceData = async (pizzaName: string): Promise<number | undefined> => {
        const result: any[] = await BaseDatabase
            .connection(PizzasDatabase.TABLE_PIZZAS)
            .select("price")
            .where({ name: pizzaName })
    
        return result[0].price as number
    }

    public getOrdersData = async (): Promise<IOrderDB[]> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()

        return result
    }

    public getOrderItemData = async (orderId: string): Promise<IOrderItemDB[]> => {
        const result: IOrderItemDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDER_ITEMS)
            .select()
            .where({ order_id: orderId })

        return result
    }
}