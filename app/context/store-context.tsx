"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist"; // If needed for types

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);
    const persistorRef = useRef<Persistor | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        persistorRef.current = (storeRef.current as any).__persistor;
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate persistor={persistorRef.current!} loading={null}>
                {children}
            </PersistGate>
        </Provider>
    );
}