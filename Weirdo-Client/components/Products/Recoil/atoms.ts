import { atom, RecoilState } from "recoil";
import { ProductResult, ProductStatus, ProductType } from "../types/productsTypes";



export const productList: RecoilState<ProductResult> = atom({
    key: "productList",
    default: {} as ProductResult
})

export const productListForHomePage: RecoilState<ProductResult> = atom({
    key: "productListForHomePage",
    default: {} as ProductResult
})

export const productItem: RecoilState<ProductType> = atom({
    key: "productItem",
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