import React, { useState } from 'react';
import { ShoppingBasket, ShoppingCart } from 'lucide-react';
import { formatPrice } from "@/lib/formatPrice"
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product } from '@/models/product';
import ProductModal from './product-modal';
import { CartProduct } from '@/models/cart-item';
import { Input } from '../ui/input';

type ProductCardProps = {
    product: Product,
    cartItem?: CartProduct,
    onAdd: (price: number) => void,
    onUpdate?: (id: number, price: number) => void,
    onRemove?: (id: number) => void
}
export default function ProductCard({ product, onAdd, cartItem, onRemove, onUpdate }: ProductCardProps) {

    const [modalOpen, setModalOpen] = useState(false);

    const handleAddToCart = (price: number) => {
        onAdd(price);
        toast.success(`${product.name} ajouté au panier`);
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                onClick={() => setModalOpen(true)}
                className='cursor-pointer'
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div

                    className="group block bg-(--card) rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative aspect-square bg-(--secondary)/50 overflow-hidden">
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-(--muted-foreground)/30 flex items-center justify-center text-(--muted-foreground)">
                                <ShoppingCart className="w-12 h-12 stroke-1" />
                            </div>
                        )}

                        {/* Discount Badge */}
                        {cartItem && (
                            <div className="absolute top-3 flex  items-center gap-2 left-3 bg-(--destructive) text-(--destructive-foreground) text-xs font-bold px-2.5 py-1 rounded-lg">
                                <ShoppingBasket className="w-4 h-4" /> {formatPrice(cartItem.price)}
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className=" cursor-pointer font-semibold first-letter:uppercase leading-snug line-clamp-2 mb-2 group-hover:text-(--primary) transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-xs text-(--accent) font-semibold mt-2">Prix négociable — cliquer pour commander</p>
                    </div>

                </div>

                {/* Mobile Add to Cart */}
               
            </motion.div>

            <ProductModal
                product={product}
                open={modalOpen}
                cartItem={cartItem}
                onOpenChange={() => { setModalOpen(false); }}
                onAdd={(value) => {
                    onAdd(value);
                    setModalOpen(false);
                    toast.success(`${product.name} ajouté au panier`);
                }}
                onRemove={onRemove}
                onUpdate={(id, price) => {
                    onUpdate?.(id, price);
                    toast.success(`${product.name} mis à jour`);
                }} />
        </div>
    );
}