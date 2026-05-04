"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Zap, Tag, Clock, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductGridSkeleton from '@/app/components/products/product-grid-skeleton';
import ProductCard from '@/app/components/products/product-card';
import { Product } from '@/models/product';
import { useCountdown } from '@/hooks/use-countdown';

const tabs = [
    { id: 'deals', label: 'Offres Flash', icon: Zap },
    { id: 'discounted', label: 'Soldes', icon: Tag },
    { id: 'featured', label: 'Coups de cœur', icon: Flame },
];


export default function Promotions() {
    const [activeTab, setActiveTab] = useState('deals');
    // const countdown = useCountdown();
    const [isLoading] = useState<boolean>(false)
    //   const { data: allProducts = [], isLoading } = useQuery({
    //     queryKey: ['promo-products'],
    //     queryFn: () => base44.entities.Product.list('-created_date', 100),
    //   });
    const filtered: Product[] = []
    //   const filtered = React.useMemo(() => {
    //     if (activeTab === 'deals') return allProducts.filter(p => p.is_deal);
    //     if (activeTab === 'discounted') return allProducts.filter(p => p.original_price && p.original_price > p.price);
    //     if (activeTab === 'featured') return allProducts.filter(p => p.is_featured);
    //     return allProducts;
    //   }, [allProducts, activeTab]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Hero Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-foreground text-background px-8 py-12 md:px-16"
            >
                <div className="absolute inset-0 bg-linear-to-r from-(--primary)/25 to-transparent" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-(--primary) fill-(--primary)" />
                        <span className="text-(--primary) font-bold text-sm uppercase tracking-widest">Promotions</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                        Les meilleures offres<br className="hidden md:block" /> du moment
                    </h1>
                    <p className="text-background/60 mb-6 max-w-lg">
                        Des réductions exclusives sur une sélection de produits premium. Ne manquez pas ces prix exceptionnels !
                    </p>
                    <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-(--primary)" />
                        <span className="text-sm text-background/60">Se termine dans</span>
                        {/* <span className="font-bold text-primary text-lg tabular-nums">{countdown}</span> */}
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                                ? 'bg-foreground text-background shadow-sm'
                                : 'bg-(--card) border border-(--border) hover:bg-(--secondary)'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
                <span className="ml-auto self-center text-sm text-(--muted-foreground)">
                    {filtered.length} produit{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Grid */}
            {isLoading ? (
                <ProductGridSkeleton />
            ) : filtered.length === 0 ? (
                <div className="text-center py-24 text-(--muted-foreground)">
                    <Tag className="w-12 h-12 mx-auto mb-4 stroke-1" />
                    <p className="text-lg font-semibold">Aucune promotion dans cette catégorie</p>
                    <p className="text-sm mt-1">Revenez bientôt, de nouvelles offres arrivent !</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} onAdd={function (): void {
                            throw new Error('Function not implemented.');
                        } } />
                    ))}
                </div>
            )}
        </div>
    );
}
