
import api from "@/lib/axios";
import { Product } from "@/models/product";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "auth/fetchProducts",
    async (page: number, thunkAPI) => {
        try {
            const response = await api.get(`/products/?page=${page}`);
            
            return { results: response.data.results, count: response.data.count, next: response.data.next, previous: response.data.previous };
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

interface StateInterface {
    items: Product[]
    loading: boolean;
    error: any;
    totalCount: number;
    nextPage: string | null,
    prevPage: string | null,
}
const initialState: StateInterface = {
    items: [],
    loading: false,
    error: null,
    totalCount: 0,
    nextPage: null,
    prevPage: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.results.map((item: Product) => ({ ...item, quantity: 0 }));
                state.totalCount = action.payload.count;
                state.nextPage = action.payload.next;
                state.prevPage = action.payload.previous;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


// export const {  } = productSlice.actions;
export default productSlice.reducer;