import { OrderItemType, PersonalOrderType } from "./OrderType"

export interface HistoryType {
    createdDate: string,
    acceptedDate: string,
    finishedDate: string,
    modifiedDate: string,
    orderItems: OrderItemType[]
    status: string[],
    totalCount: number,
    totalPrice: number
}

export function toPersonalOrder(orderItem: OrderItemType) {
    const result: PersonalOrderType = {
        itemId: orderItem.item.id,
        sizes: orderItem.sizes,
        pack: orderItem.pack,
        count: orderItem.count,
        additionalCharge: orderItem.additionalPrice,
        price: orderItem.price,
        temp: orderItem.temp,
        syrup: orderItem.syrup,
        whipping: orderItem.whipping,
        drizzle: orderItem.drizzle,
        topping: orderItem.topping,
        espresso: orderItem.espresso,
        milkType: orderItem.milkType[0]
    };
    return result;
}