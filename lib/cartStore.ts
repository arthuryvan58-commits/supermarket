import { CartProduct } from "../models/cart-item";
import { Product } from "../models/product";

// Simple cart state management using localStorage
const CART_KEY = 'SuperMarket _cart';

export function getCart(): CartProduct[] {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}


export function addToCart(product: Product, quantity = 1) {
    const cart = getCart();
    // const existing = cart.find(item => item.productId === product.id);
    // if (existing) {
    //     existing.quantity += quantity;
    // } else {
    //     cart.push({
    //         productId: product.id,
    //         name: product.name,
    //         price: product.price,
    //         image_url: product.image_url,
    //         quantity
    //     });
    // }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    return cart;
}

export function updateCartQuantity(productId: string, quantity: number) {
    let cart = getCart();
    if (quantity <= 0) {
        cart = cart.filter(item => item.productId !== productId);
    } else {
        const item = cart.find(item => item.productId === productId);
        if (item) item.quantity = quantity;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    return cart;
}

export function removeFromCart(productId: string) {
    const cart = getCart().filter(item => item.productId !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    return cart;
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('cart-updated'));
    return [];
}

export function getCartTotal(cart: CartProduct[]) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(cart: CartProduct[]) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}