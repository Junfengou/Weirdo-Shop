import { atom, RecoilState } from "recoil";
import { ProductType } from "../types/productsTypes";



export const productList: RecoilState<ProductType> = atom({
    key: "productList",
    default: {} as ProductType
})

export const productForm: RecoilState<ProductType> = atom({
    key: "productForm",
    default: {
        name: "", description: "", price: 0
    } as ProductType
})

export const productImagePath: RecoilState<string> = atom({
    key: "productImagePath",
    default: ""
})