import { InnerItemType, SyrupType } from "./ItemType";

//== type ==//
export interface PriceType {
    count: number,
    price: number,
    additionalCharge: number,
}

export interface OrderType {
    [index: string]: any;
    itemId: number,
    sizes: string,
    pack: string,
    temp: string
}

export interface PersonalType {
    espresso: number,  //커피
    milkType: string | null,   //우유
    syrup: Array<SyrupType>,
    whipping: string,   //휘핑크림
    drizzle: string,    //드리즐
    topping: string     //토핑
}

export interface ReorderType extends PriceType, PersonalType {
}

//퍼스널 옵션을 추가한 주문
export interface PersonalOrderType extends PriceType, OrderType, PersonalType {
}

export interface OrderItemType {
    id: number,
    additionalPrice: number,
    price: number,
    orderPrice: number,
    count: number,
    sizes: string,
    espresso: number,
    item: InnerItemType,
    milkType: string[],
    pack: string,
    syrup: SyrupType[],
    temp: string,
    topping: string,
    whipping: string,
    drizzle: string
}

//==초기 값==//
export const initialState: PersonalOrderType = {
    itemId: 0,
    sizes: '',
    pack: '',
    count: 1,
    additionalCharge: 0,
    price: 0,
    temp: '',

    //==퍼스널 옵션==//
    syrup: [],
    whipping: '',
    drizzle: '',
    topping: '',
    espresso: 0,
    milkType: null
}

export const initReorder: ReorderType = {
    count: 1,
    price: 0,
    additionalCharge: 0,
    syrup: [],
    whipping: '',
    drizzle: '',
    topping: '',
    espresso: 0,
    milkType: null
}
