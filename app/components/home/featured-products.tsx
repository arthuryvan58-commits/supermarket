import React from 'react';
import Link from 'next/link';
import ProductCard from '../products/product-card';
import ProductGridSkeleton from '../products/product-grid-skeleton';
import { Product } from '@/models/product';
import { CartProduct } from '@/models/cart-item';

type FeaturedProductsProps = {
    title: string,
    data: Product[],
    isLoading: boolean,
    onAdd?: (value: Product, price: number) => void,
    onUpdate?: (id: number, quantity: number) => void,
    onRemove?: (id: number) => void,
    cart: CartProduct[]
}

export default function FeaturedProducts({ title, onUpdate, cart, onRemove, data, onAdd, isLoading }: FeaturedProductsProps) {

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <Link href="/products" className="text-sm font-medium text-(--primary) hover:underline">
                    Voir tout
                </Link>
            </div>
            {isLoading ? (
                <ProductGridSkeleton count={4} />
            ) : data.length === 0 ? (
                <div className="text-center py-12 text-(--muted-foreground)">
                    Aucun produit disponible
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.slice(0, 8).map((product) => {
                        const cartItem = cart.find(x => x.productId === product.id);
                        return (
                            <ProductCard
                                onUpdate={onUpdate}
                                cartItem={cartItem}
                                onRemove={onRemove}
                                onAdd={(price) => onAdd?.(product, price)}
                                key={product.id}
                                product={product} />
                        )
                    })}
                </div>
            )}
        </section>
    );
}