export interface Order {
    id?: number;
    created_at?: string;
    updated_at?: string;
    active: boolean;
    total: number;
    business_id: number;
}