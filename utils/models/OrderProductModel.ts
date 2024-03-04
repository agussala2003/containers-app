export interface OrderProductModel {
    id?: number
    product_name: string
    description: string
    price: number
    image: string
    active: boolean
    bought?: number
    quantity: number
    created_at?: string
    updated_at?: string
    category_id: number
    business_id: number
}