import { atom, RecoilState } from "recoil";
import { ProductStatus, ProductType } from "../types/productsTypes";



export const productList: RecoilState<ProductType> = atom({
    key: "productList",
    default: {} as ProductType
})

export const productImagePath: RecoilState<string> = atom({
    key: "productImagePath",
    default: ""
})

export const productImageName: RecoilState<string> = atom({
    key: "productImageName",
    default: ""
})

export const productStatus: RecoilState<ProductStatus> = atom({
    key: "productStatus",
    default: {} as ProductStatus
})