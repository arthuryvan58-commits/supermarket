
import api from "@/lib/axios";
import { Order } from "@/models/command";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
    "auth/fetchOrders",
    async (token: string, thunkAPI) => {

        try {
            const response = await api.get(`/orders/`
                , {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // console.log(response)
            return response.data;
            // return { results: response.data.results, count: response.data.count, next: response.data.next, previous: response.data.previous };
        } catch (error: any) {

            let message = "Fetch error"
            if (error?.message) {
                message = error?.message
            } else {
                console.log(error)
            }
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const fetchOrdersByPhone = createAsyncThunk(
    "auth/fetchOrdersByPhone",
    async (phone: string, thunkAPI) => {
        try {
            const response = await api.get(`/orders/by-phone/?phone=${phone}`);
            // console.log(response)   
            return response.data;
            // return { results: response.data.results, count: response.data.count, next: response.data.next, previous: response.data.previous };
        } catch (error: any) {

            let message = "Fetch error"
            if (error?.message) {
                message = error?.message
            } else {
                console.log(error)
            }
            return thunkAPI.rejectWithValue(message);
        }
    },
);
type CreateOrderData = {
    delivery_required: boolean;
    delivery_address: string;
    contact_phone: string;
    contact_email: string;
    contact_name: string;
    payment_method: "orange_money" | "mtn_mobile_money";
    items: {
        product_name: string;
        quantity: number;
        unit_price: number;
    }[];
}
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (data: CreateOrderData, thunkAPI) => {
        try {
            const response = await api.post(`/create-order/`
                , {
                    "delivery_required": data.delivery_required,
                    "delivery_address": data.delivery_address,
                    "contact_phone": data.contact_phone,
                    "contact_name": data.contact_name,
                    "contact_email": data.contact_email,
                    "contact_ville": data.delivery_required,
                    "payment_method": data.payment_method,
                    "items": data.items
                }
            );
            return response.data;
        } catch (error: any) {
            console.log(error)
            let message = "Fetch error"
            if (error?.message) {
                message = error?.message
            } else {
                console.log(error)
            }
            return thunkAPI.rejectWithValue(message);
        }
    },
);

// type paidOrderData = {
//     orderId: number;
//     contact_email: string;
//     contact_phone: string;
// }
// export const paidOrder = createAsyncThunk(
//     "order/paidOrder",
//     async (data: paidOrderData, thunkAPI) => {
//         try {
//             const response = await api.post(`/payment/`, data
//             );
//             return response.data;
//         } catch (error: any) {
//             console.log(error)
//             let message = "Fetch error";
//             if (error?.message) {
//                 message = error?.message;
//             } else {
//                 console.log(error);
//             }
//             return thunkAPI.rejectWithValue(message);
//         }
//     });


interface StateInterface {
    items: Order[]
    loading: boolean;
    loadingOrder: boolean;

    loadingOrderAuth: boolean;
    errorOrder: any;
    errorOrderAuth: any;
    error: any;
    totalCount: number;
    nextPage: string | null,
    prevPage: string | null,

}
const initialState: StateInterface = {
    items: [],
    loading: false,
    loadingOrder: false,
    loadingOrderAuth: false,
   
    error: null,
    errorOrder: null,
    errorOrderAuth: null,
    totalCount: 0,
    nextPage: null,
    prevPage: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loadingOrderAuth = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loadingOrderAuth = false;
                state.items = action.payload
                // state.totalCount = action.payload.count;
                // state.nextPage = action.payload.next;
                // state.prevPage = action.payload.previous;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loadingOrderAuth = false;
                state.errorOrderAuth = action.payload;
            })
            .addCase(fetchOrdersByPhone.pending, (state) => {
                state.loadingOrder = true;
            })
            .addCase(fetchOrdersByPhone.fulfilled, (state, action) => {
                state.loadingOrder = false;
                console.log(action.payload)
                state.items = action.payload
                // state.totalCount = action.payload.count;
                // state.nextPage = action.payload.next;
                // state.prevPage = action.payload.previous;
            })
            .addCase(fetchOrdersByPhone.rejected, (state, action) => {
                state.loadingOrder = false;
                state.errorOrder = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [...state.items, action.payload];
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
          
    },
});

export const { resetError } = orderSlice.actions;
export default orderSlice.reducer;