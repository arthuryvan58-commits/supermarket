import { CartProduct } from '@/models/cart-item';
import { createSlice } from '@reduxjs/toolkit';

const CART_KEY = 'SuperMarket _cart';

interface StateInterface {
    items: CartProduct[]
}
const initialState: StateInterface = {
    items: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState, // [{articleId, nom, prix, quantite}]
    reducers: {
        addToCart: (state, action) => {
            const exist = state.items.find(x => x.productId === action.payload.productId);
            if (exist) {
                exist.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            //    localStorage.setItem(CART_KEY, JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(x => x.productId !== action.payload);
        },
        clearCart: (state) => { state.items = []; },
        updateCartQuantity(state, action) {
            const { productId, price } = action.payload;
            if (price <= 0) {
                state.items = state.items.filter(item => item.productId !== productId);
            } else {
                
                const item = state.items.find(item => item.productId === productId);
                if (item) item.price = price;
            }
            // localStorage.setItem(CART_KEY, JSON.stringify(state.items));
        }

    }
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;