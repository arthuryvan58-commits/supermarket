"use client"

import { div } from "framer-motion/client";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import CartDrawer from "../components/ui/cart-drawer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, removeFromCart, updateCartQuantity } from "@/store/cart/slice";
import LoginForm from "../components/ui/login-form";
import { useSignInMutation } from "@/store/api/slice";
import { setUser } from "@/store/user/slice";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [open, setOpen] = useState<boolean>(false)
    const [openLoginForm, setOpenLoginForm] = useState<boolean>(false)
    const { user } = useAppSelector((state => state.user))

    const [signIn, { isLoading }] = useSignInMutation()

    const { items } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch()
    function handleRemoveItem(id: number) {
        dispatch(removeFromCart(id))
    }
    function handleClearCart() {
        dispatch(clearCart())
    }
    function handleUpdateItem(id: number, quantity: number) {
        dispatch(updateCartQuantity({ productId: id, quantity }))
    }
    async function handleSignIn(name: string, tel: string, street: string, city: string, email: string) {

        try {
            const res = await signIn({
                nom: name,
                telephone: tel,
                zone: city + ", " + street,
                email: email
            }).unwrap()
            dispatch(setUser({
                user: {
                    email: email,
                    name: email,
                    phone: tel,
                    city: city,
                    street: street,
                },
                token: res.token.access,
                refresh: res.token.refresh,
            }))
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div>
            {
                !user && <LoginForm isLoading={isLoading} onSubmit={handleSignIn} open={openLoginForm} onClose={() => { setOpenLoginForm(false) }} />
            }
            <CartDrawer
                isConnected={user != null}
                onRemove={handleRemoveItem}
                data={items}
                open={open}
                onClose={function (): void {
                    setOpen(false);
                }}
                onClear={handleClearCart}
                onUpdate={handleUpdateItem} />
            <Navbar cartCount={items.length} onCartOpen={() => { setOpen(true) }} />
            {children}
            <Footer />
        </div>
    );
}
