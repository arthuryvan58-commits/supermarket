

// Interface principale du produit
export interface Product {
    id: number,
    name: string,
    description: string,
    image_url: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    price: number
}
