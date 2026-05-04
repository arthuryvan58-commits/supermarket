"use client"
import React, { useState, useEffect } from 'react';
import { Package, User, LayoutDashboard, PowerOff } from 'lucide-react';
import OrdersList from '@/app/components/dashboard/order-card';
import ProfileForm from '@/app/components/dashboard/profile-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders } from '@/store/order/slice';
import { removeUser } from '@/store/user/slice';
import { useRouter } from 'next/navigation';

const tabs = [
    { id: 'orders', label: 'Mes commandes', icon: Package },
    { id: 'profile', label: 'Mon profil', icon: User },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('orders');
    const dispatch = useAppDispatch();
    const { token, refresh } = useAppSelector((state => state.user))
    const router = useRouter()
    useEffect(() => {
        if (token) {
            dispatch(fetchOrders(token)); // Charge la page 1 au montage
        }
    }, [dispatch, token]);

    function logout() {
        dispatch(removeUser())
        router.replace('/')
    }
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-(--primary)/10 flex items-center justify-center">
                        <LayoutDashboard className="w-6 h-6 text-(--primary)" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">Mon espace client</h1>
                        <p className="text-sm text-(--muted-foreground)">Gérez vos commandes et votre profil</p>
                    </div>
                </div>
                <button onClick={logout} className='text-(--destructive)/80 text-sm cursor-pointer flex items-center gap-2 hover:text-(--destructive)' type='button'>
                    <PowerOff size={18} /> Se déconnecter
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === tab.id
                            ? 'border-(--primary) text-foreground'
                            : 'border-transparent text-(--muted-foreground) hover:text-foreground'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'orders' && <OrdersList />}
            {activeTab === 'profile' && <ProfileForm />}
        </div>
    );
}