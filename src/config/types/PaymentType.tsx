
export interface PrepareType {
    orderId: number | string,
    itemName: string,
    quantity: number,
    totalAmount: number | string,
}

export interface PaymentType {
    [index: string] : any
    order_id: number | string,
    pg_token: string,
    tid: string
}