"use client"
import React, { useEffect, useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Search, Package, CheckCircle2, Truck, Clock, XCircle, ChefHat, MapPin, Phone, File, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCameroonNumber, formatPrice } from '@/lib/formatPrice';
import { Order } from '@/models/command';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders, fetchOrdersByPhone } from '@/store/order/slice';
import { redirect, useSearchParams } from 'next/navigation';
import { usePaidOrderMutation } from '@/store/api/slice';

const STATUS_CONFIG = {
    draft: {
        label: 'Brouillon',
        icon: Clock,
        color: 'text-stone-600',
        bg: 'bg-stone-50',
        border: 'border-stone-300',
        step: 0,
    },
    submitted: {
        label: 'Soumis',
        icon: CheckCircle2,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        step: 1,
    },
    pending: {
        label: 'En attente de paiement',
        icon: ChefHat,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-300',
        step: 2,
    },
    paid: {
        label: 'Payée',
        icon: ChefHat,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-300',
        step: 3,
    },
    closed: {
        label: 'Livrée',
        icon: Truck,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-300',
        step: 4,
    },
    cancelled: {
        label: 'Annulée',
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-300',
        step: -1,
    },

};

const STEPS = [
    { key: 'draft', label: 'Brouillon', icon: File },
    { key: 'submitted', label: 'Soumis', icon: CheckCircle2 },
    { key: 'pending', label: 'En attente de paiement', icon: DollarSign },
    { key: 'paid', label: 'Payé', icon: Truck },
    { key: 'closed', label: 'Livrée', icon: MapPin },
];

function OrderTracker({ order, onPayment }: { order: Order; onPayment: (orderId: number, email: string, tel: string) => void }) {
    const config = STATUS_CONFIG[order.status];
    const currentStep = config.step;
    const isCancelled = order.status === "cancelled";
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-(--card) rounded-2xl border border-(--border) shadow-sm overflow-hidden"
        >
            {/* Header */}
            <div className={`px-5 py-4 border-b ${config.bg} ${config.border} border-(--border) border-l-4`}>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-(--muted-foreground) font-medium mb-0.5">Commande</p>
                        <p className="font-bold text-lg">{order.order_number || `#${order.id}`}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold ${config.bg} ${config.color} border ${config.border}`}>
                        <Icon className="w-4 h-4" />
                        {config.label}
                    </div>
                </div>
            </div>

            {/* Progress stepper */}
            {!isCancelled && (
                <div className="px-5 py-6">
                    <div className="relative flex items-start justify-between">
                        {/* Progress line */}
                        <div className="absolute left-0 right-0 top-5 h-1 bg-(--secondary) rounded-full" />
                        <div
                            className="absolute left-0 top-5 h-1 bg-(--primary) rounded-full transition-all duration-700"
                            style={{ width: `${Math.max(0, (currentStep / (STEPS.length - 1)) * 100)}%` }}
                        />
                        {STEPS.map((step, i) => {
                            const StepIcon = step.icon;
                            const done = i <= currentStep;
                            const active = i === currentStep;
                            return (
                                <div key={step.key} className="relative flex flex-col items-center gap-2 z-10">
                                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${done
                                        ? 'bg-(--primary) border-background text-(--primary-foreground)'
                                        : 'bg-(--card) border-(--border) text-(--muted-foreground)'
                                        } ${active ? ' shadow-md shadow-(--primary)/30' : ''}`}>
                                        <StepIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className={`text-[10px] font-semibold text-center leading-tight max-w-13 ${done ? 'text-foreground' : 'text-(--muted-foreground)'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}


            {
                order.status === "submitted" && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 text-sm text-yellow-700">
                        Votre commande est en cours de confirmation. Nous vous contacterons bientôt pour les détails de la livraison.
                    </div>)
            }
            {
                order.status === "paid" && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-300 text-sm text-green-700">
                        Votre commande a été payée avec succès. Elle est en cours de préparation et sera bientôt livrée.
                    </div>
                )
            }
            {
                order.status === "closed" && (
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-300 text-sm text-indigo-700">
                        Votre commande a été livrée. Nous espérons que vous apprécierez votre repas !
                    </div>
                )
            }
            {
                order.status === "cancelled" && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-300 text-sm text-red-700">
                        Cette commande a été annulée. Contactez-nous pour plus d'informations.
                    </div>
                )
            }
            {
                order.status === "draft" && (
                    <div className="mt-4 p-4 bg-stone-50 border border-stone-300 text-sm text-stone-700">
                        Cette commande est en brouillon. Veuillez la finaliser pour qu'elle soit prise en compte.
                    </div>
                )
            }
            {
                order.status === "pending" && (
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-300 text-sm text-indigo-700">
                        Votre commande est en attente de paiement. Veuillez procéder au paiement pour que nous puissions commencer la préparation.
                    </div>
                )
            }


            {/* Details */}
            <div className="px-5 py-5  gap-4  space-y-3 border-t border-(--border)">
                <div className='grid grid-cols-2 gap-2'>
                    <div className="pt-4 bg-(--card)  shadow shadow-black/5  rounded-2xl p-4  text-sm">
                        <h3 className='mb-2 font-bold'>Informations de contact</h3>
                        <p className=" text-(--muted-foreground)">Client : {order.contact_name}</p>
                        <p className=" text-(--muted-foreground)">Téléphone : {order.contact_phone}</p>
                        <p className=" text-(--muted-foreground)">Ville : {order.delivery_address}</p>
                    </div>
                    <div className="pt-4 bg-(--card) shadow shadow-black/5 rounded-2xl p-4  text-sm">
                        <h3 className='mb-2 font-bold'>Paiement</h3>
                        <p className=" text-(--muted-foreground)">Canal  : {order.payment_method.replaceAll('_', ' ')}</p>
                        <p className=" text-(--muted-foreground)">Sous-total : {order.subtotal} XAF</p>
                        <p className=" text-(--muted-foreground)">Commission 5% : {order.commission_amount} {"XAF"}</p>
                        <p className="text-xl text-foreground font-semibold">Total dû : {order.total_due} {"XAF"}</p>
                    </div>
                </div>

                {/* Items */}
                {order.items && order.items.length > 0 && (
                    <div className="space-y-2 bg-(--card) border border-(--border) shadow shadow-black/5 rounded-2xl p-4 ">
                        <p className="text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">Articles commandés</p>
                        <div className="space-y-1.5">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center  border border-(--border) justify-between text-sm bg-(--secondary)/40 rounded-lg px-3 py-2">
                                    <span className="font-medium truncate">{item.product_name}</span>
                                    <span className="text-(--muted-foreground) shrink-0 ml-2">{item.unit_price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {
                    order.status == "pending" && (
                        <Button onClick={() => onPayment(order.id, order.contact_email, order.contact_phone)} type="button" className="h-12 w-full justify-center px-6 flex bg-(--accent) items-center rounded-xl font-semibold gap-2"
                            size={"sm"} variant={'icon'} >
                            Payer la commande
                        </Button>
                    )
                }
            </div>

        </motion.div>
    );
}

export default function SuiviCommande() {

    const { loadingOrderAuth, loadingOrder, items: orderItems } = useAppSelector((state) => state.order);
    const { user, token } = useAppSelector((state) => state.user);
    const searchParams = useSearchParams();
    const initialPhone = searchParams.get('phone') || '';

    const [paidOrder, { isLoading }] = usePaidOrderMutation();

    const [phone, setPhone] = useState(initialPhone);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && user.phone) {
            dispatch(fetchOrdersByPhone(user.phone))
        }
    }, [dispatch, user]);
    const handleSearch = async () => {

        if (!phone.trim()) return;
        dispatch(fetchOrdersByPhone(formatCameroonNumber(phone)))


    };

    async function handlePayment(orderId: number, email: string, tel: string) {
        console.log("Initiating payment for order", orderId, email, tel);
        
        try {
            const data = {
                order_id: orderId,
                contact_email: email,
                contact_phone: tel
            }
            const res = await paidOrder(data).unwrap()
            console.log(res)
            window.location.href = res.payment_url
        } catch (error: any) {
            console.log(error);
        }
    }

    if (loadingOrderAuth) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                        <Package className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Chargement de vos commandes...</h1>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                        <Package className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Redirection vers la page de paiement...</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Suivi de commande</h1>
                <p className="text-(--muted-foreground)">
                    Entrez votre numéro de téléphone pour retrouver et suivre vos commandes.
                </p>
            </div>

            {/* Search */}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch()
            }} className="flex gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--muted-foreground) text-sm"><Phone /></span>
                    <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+237 6XX XXX XXX"
                        className="rounded-xl pl-10 h-12 text-base"
                    />
                </div>
                <Button type="submit" disabled={loadingOrderAuth || loadingOrder} className="h-12 px-6 flex items-center rounded-xl font-semibold gap-2"
                    size={"sm"} variant={'primary'}>
                    <Search className="w-4 h-4" />
                    {loadingOrderAuth || loadingOrder ? 'Recherche...' : 'Rechercher'}
                </Button>
            </form>

            {/* Results */}
            <AnimatePresence mode="wait">

                <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {orderItems.length === 0 ? (
                        <div className="text-center py-16 space-y-3">
                            <Package className="w-12 h-12 mx-auto text-(--muted-foreground)/40 stroke-1" />
                            <p className="font-semibold text-(--muted-foreground)">Aucune commande trouvée</p>
                            <p className="text-sm text-(--muted-foreground)/70">Vérifiez le numéro de téléphone saisi.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-(--muted-foreground) font-medium">
                                {orderItems.length} commande{orderItems.length > 1 ? 's' : ''} trouvée{orderItems.length > 1 ? 's' : ''}
                            </p>
                            {orderItems.map(order => (
                                <OrderTracker onPayment={handlePayment} key={order.id} order={order} />
                            ))}
                        </>
                    )}
                </motion.div>

            </AnimatePresence>
        </div>
    );
}