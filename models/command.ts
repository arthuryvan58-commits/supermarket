import { Product } from "./product";

export interface Order {
    id: number,
    order_number: string,
    created_at: string,
    updated_at: string,
    delivery_required: boolean,
    delivery_address: string,
    contact_phone: string,
    contact_name: string,
    contact_email: string,
    payment_method: "orange_money" | "mtn_mobile_money",
    status: "submitted" | "pending" | "draft" | "paid" | "cancelled" | "closed",
    payment_status: string,
    subtotal: number,
    commission_percent: number,
    commission_amount: number,
    total_due: number,
    campay_transaction_id: string | null,
    items: {
        id: number, line_total: string, product_name: string, quantity: string, unit_price: string
    }[],
    user: {
        id: 1,
        username: string,
        email: string,
        first_name: string,
        last_name: string
    },
}

