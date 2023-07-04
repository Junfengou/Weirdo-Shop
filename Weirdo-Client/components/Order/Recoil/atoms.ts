import { RecoilState, atom } from "recoil"

export type Order = {
    id: string,
    email: string,
    totalPrice: number,
    createdAt: number,
}

export type OrderListType = {
    result: Order[]
}

export type OrderItem = {
    id: string,
    productId: number,
    productName: string,
    productPrice: number,
    quantity: number,
    totalPrice: number,
    createdAt: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    imagePath: string
}

export type OrderItemListType = {
    result: OrderItem[]
}

export const orderList: RecoilState<OrderListType> = atom({
    key: "orderList",
    default: {} as OrderListType
})

export const orderItemList: RecoilState<OrderItemListType> = atom({
    key: "orderItemList",
    default: {} as OrderItemListType
})