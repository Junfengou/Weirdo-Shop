export interface ProductResult {
    products: ProductType[]
}

export interface ProductType {
    id: number,
    name: string,
    description: string,
    price: number,
    imagePath: string
}

export interface ProductStatus {
    status: number | null,
    message: string,
}