import { IGetOrdersOutputDTO } from './../models/order';
import { IdGenerator } from './../services/IdGenerator';
import { OrderDatabase } from '../database/OrderDataBase';
import { ParamsError } from "../errors/ParamsError";
import { ICreateOrderInputDTO, ICreateOrderOutputDTO, IOrderItemDB, Order } from "../models/order";
import { NotFoundError } from '../errors/NotFoundError';

export class OrderBusiness {
    constructor(
        private orderDataBase: OrderDatabase,
        private idGenerator: IdGenerator
    ) { }

    public createOrderBusiness = async (input: ICreateOrderInputDTO) => {
        const pizzasInput = input.pizzas


        if (pizzasInput.length === 0) {
            throw new ParamsError("Pedido vazio! Informe pelo menos uma pizza")
        }

        const pizzas = pizzasInput.map((pizza) => {
            if (pizza.quantity <= 0) {
                throw new ParamsError("Quantidade de pizza inválida! A quantidade mínima é 1")
            }

            return {
                ...pizza,
                price: 0
            }
        })

        for (let pizza of pizzas) {
            const price = await this.orderDataBase.getPriceData(pizza.name)

            if (!price) {
                throw new NotFoundError("Pizza não existe")
            }

            pizza.price = price
        }

        const orderId = this.idGenerator.generate()

        await this.orderDataBase.createOrderData(orderId)

        for (let pizza of pizzas) {
            const orderItem: IOrderItemDB = {
                id: this.idGenerator.generate(),
                pizza_name: pizza.name,
                quantity: pizza.quantity,
                order_id: orderId
            }

            await this.orderDataBase.insertItemOnOrderData(orderItem)
        }

        const total = pizzas.reduce(
            (acc, pizza) => (acc + (pizza.price * pizza.quantity)),
            0
        )

        const response: ICreateOrderOutputDTO = {
            message: "Pedido realizado com sucesso",
            order: {
                id: orderId,
                pizzas,
                total
            }
        }

        return response

    }

    public getOrderBusiness = async () => {

        const ordersDB = await this.orderDataBase.getOrdersData()

        const orders:Order [] = []

        for (let orderDB of ordersDB ){
            const order = new Order(
                orderDB.id,
                []
            )

            const  orderItemsDB: any  = await this.orderDataBase.getOrderItemData(order.getId())

            for (let orderItemDB of orderItemsDB){
                const price = await this.orderDataBase.getPriceData(orderItemDB.pizza_name)
                orderItemDB.price = price
            }
            order.setOrderItems(orderItemsDB)

            orders.push(order)
        }

        const response: IGetOrdersOutputDTO = {
            orders: orders.map((order)=>({
                id: order.getId(),
                pizzas: order.getOrderItems().map((item) => ({
                    name: item.pizza_name,
                    quantity: item.quantity,
                    price: item.price

            })),
            total:order.getTotal()
        }))

    }

    return response
}

}