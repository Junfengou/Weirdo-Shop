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

export const orderList: RecoilState<OrderListType> = atom({
    key: "orderList",
    default: {} as OrderListType
})