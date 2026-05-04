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
import { createOrder, resetError } from "@/store/order/slice";
import { useRouter } from "next/navigation";
import { formatCameroonNumber } from "@/lib/formatPrice";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [open, setOpen] = useState<boolean>(false)
    const [openLoginForm, setOpenLoginForm] = useState<boolean>(false)
    const { user } = useAppSelector((state => state.user))
    const router = useRouter()
    const [signIn, { isLoading }] = useSignInMutation()

    const { items } = useAppSelector((state) => state.cart);
    const { loading: orderLoading, error: orderError } = useAppSelector((state) => state.order);

    const dispatch = useAppDispatch()
    function handleRemoveItem(id: number) {
        dispatch(removeFromCart(id))
    }
    function handleClearCart() {
        dispatch(clearCart())
    }
    function handleUpdateItem(id: number, price: number) {
        dispatch(updateCartQuantity({ productId: id, price }))
    }

    async function handleSignIn(name: string, tel: string, street: string, city: string, email: string) {
        try {
            const res = await signIn({
                username: name,
                password: tel,
                zone: city + ", " + street,
                email: email
            }).unwrap()

            dispatch(setUser({
                user: {
                    email: email,
                    name: email,
                    phone: formatCameroonNumber(tel),
                    city: city,
                    street: street,
                },
                token: res.tokens.access,
                refresh: res.tokens.refresh,
            }))
        } catch (error: any) {
            console.log(error);
        }
    }

    function handleCreateOrder(delivery_required: boolean, name: string, tel: string, street: string, city: string, email: string, payment_method: "orange_money" | "mtn_mobile_money") {
        dispatch(createOrder(
            {
                delivery_required: delivery_required,
                delivery_address: street + ", " + city,
                contact_phone: formatCameroonNumber(tel),
                contact_email: email,
                contact_name: name,
                payment_method: payment_method,
                items: items.map(item => ({ product_name: item.name, quantity: 1, unit_price: item.price }))
            }
        ))
        if (!user) {
            handleSignIn(name, formatCameroonNumber(tel), street, city, email)
            return
        }
        handleClearCart()
        setOpen(false);
        router.push("/suivi?phone=" + formatCameroonNumber(tel))
    }

    function handleChangeError() {
        dispatch(resetError())
    }

    return (
        <div>
            {
                !user && <LoginForm isLoading={isLoading} onSubmit={handleSignIn} open={openLoginForm} onClose={() => { setOpenLoginForm(false) }} />
            }
            {
                orderLoading && <div className="flex z-50 fixed top-0 left-0 bottom-0 right-0 items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            <CartDrawer
                error={orderError}
                onCancel={handleChangeError}

                isLoading={orderLoading}
                onCreateOrder={(value) => { handleCreateOrder(value.delivery_required, value.name, value.tel, value.street, value.city, value.email, value.payment_method) }}
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
