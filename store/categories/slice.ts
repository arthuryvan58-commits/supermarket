
import api from "@/lib/axios";
import { Category } from "@/models/category";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    "auth/fetchCategories",
    async (page: number, thunkAPI) => {
        try {
            const response = await api.get(`/categories?page=${page}`);
            return response.data.data;
        } catch (error: any) {
        
            let message = "Fetch error";
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
    items: Category[]
    loading: boolean;
    error: any;
}
const initialState: StateInterface = {
    items: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default categorySlice.reducer;