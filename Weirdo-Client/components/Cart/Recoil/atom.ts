import { RecoilState, atom } from "recoil"

export type CartItem = {
    id: string,
    imagePath: string,
    productName: string,
    productPrice: number,
    quantity: number,
    totalPrice: number,
    cartItemProductId: number
    cartItemId: number
}

export type CartItemListType = {
    cartItemList: CartItem[]
}

export const cartItemList: RecoilState<CartItemListType> = atom({
    key: "cartItemList",
    default: {} as CartItemListType
})


export const cartItemDeleteStatus:RecoilState<boolean> = atom({
    key: "cartItemDeleteStatus",
    default: false
})