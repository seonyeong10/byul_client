export interface CategoryType {
    id: number,
    name: string,
    engName?: string,
    parent?: CategoryType,
    children?: Array<CategoryType>
}

export interface SyrupType {
    name: string,
    count: number,
    additionalCharge: number
}

export interface AttachFileType {
    id: number,
    name: string,
    dir: string
}

export interface MenuDetailType {
    [index: string]: any;
    id: number,
    sizes: string,
    capacity: number,
    calorie: number,
    carbohydrate?: number,
    sugar?: number,
    protein?: number,
    fat?: number,
    saturFat?: number,
    transFat?: number,
    cholesterol?: number,
    caffeine?: number,
    sodium?: number,

    //==퍼스널 옵션==//
    espresso?: number,  //커피
    milkType?: string,   //우유
    syrup?: Array<SyrupType>,
    whipping?: string,   //휘핑크림
    drizzle?: string,    //드리즐
    topping?: string     //토핑
}

//==사용==//
export interface ItemType {
    [index: string]: any;
    id: number,
    category: CategoryType,
    name: string,
    engName: string,
    price: number,
    startDate: string,
    endDate: string,
    season: string,
    pick: string,
    etc: string,
    attachFiles: Array<AttachFileType>
}

export interface MenuType extends ItemType {
    temp: string,
    menuDetail: Array<MenuDetailType>,
}

export interface GoodsType extends ItemType {
    stock: number
}

export interface InnerItemType {
    id: number,
    name: string,
    engName: string,
    price ?: number,
    attachFile: {
        id: number,
        name: string,
        dir: string
    }
}

export interface EasyItemType {
    id: number,
    category: CategoryType,
    name: string,
    attachFileId?: number,
    created_date?: string,
}