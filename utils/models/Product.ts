export interface Product {
    id?: number
    product_name: string
    description: string
    price: number
    image: string
    active: boolean
    created_at?: string
    updated_at?: string
    category_id: number
    business_id: number
}