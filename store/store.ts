import { apiSlice } from "@/store/api/slice";
import userReducer from "@/store/user/slice";
import categoryReducer from "@/store/categories/slice"
import articleReducer from "@/store/product/slice"
import cartReducer from "@/store/cart/slice"
import orderReducer from "@/store/order/slice"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

// Determine the storage type based on the environment
const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const persistConfig = {
    key: "user",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const rootReducer = combineReducers({
    user: persistedUserReducer,
    api: apiSlice.reducer,
    articles: articleReducer,
    categories: categoryReducer,
    cart: cartReducer,
    order: orderReducer
});

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(apiSlice.middleware);
        },
    });

// Define type for the Redux store with persistor
export const makeStore = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return makeConfiguredStore();
    } else {
        const store = makeConfiguredStore();
        const persistor = persistStore(store);

        // @ts-ignore: TypeScript doesn't know about __persistor by default
        (store as any).__persistor = persistor;
        return store;
    }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];