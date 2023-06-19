import { atom, RecoilState } from "recoil";
import { ProductType } from "../types/productsTypes";



export const productList: RecoilState<ProductType> = atom({
    key: "productList",
    default: {} as ProductType
})