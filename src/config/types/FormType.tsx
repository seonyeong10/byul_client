export interface InputType {
    name: string,
    value: string | number
}

export interface SelectType extends InputType {
    idx: string | number
}