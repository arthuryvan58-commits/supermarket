import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { ShoppingCart, Package, Minus, Plus, Trash2, CarIcon } from 'lucide-react';
import { formatPrice, generateNumberPrice } from '@/lib/formatPrice';
import { Product } from '@/models/product';
import { CartProduct } from '@/models/cart-item';
import { Input } from '../ui/input';

type ProductModalProps = {
    cartItem?: CartProduct, product: Product, open: boolean,
    onOpenChange: () => void,
    onUpdate?: (id: number, price: number) => void,
    onRemove?: (id: number) => void
    onAdd: (price: number) => void

}
export default function ProductModal({ product, onAdd, onUpdate, onRemove, open, onOpenChange, cartItem }: ProductModalProps) {
    const [price, setPrice] = React.useState(cartItem?.price || 0);
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <DialogTitle>
                    {" "}
                </DialogTitle>
            </DialogHeader>
            <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-2xl gap-0">
                <div className="grid sm:grid-cols-2">
                    {/* Image */}
                    <div className="relative bg-(--muted-foreground)/20 rounded-2xl aspect-square sm:aspect-auto sm:min-h-72">
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-(--muted-foreground)">
                                <Package className="w-16 h-16 stroke-1" />
                            </div>
                        )}
                    </div>
                    {/* Info */}
                    <div className="p-6 flex justify-between flex-col gap-4">
                        <div>
                            <h2 className="text-xl font-bold leading-snug">{product.name}</h2>
                            <p className='text-foreground/50 p-2 text-sm'>{product.description}</p>
                        </div>
                        {/* CTA */}
                        <div className=" space-y-4 items-baseline gap-2">
                            <label htmlFor="" className='text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)'>Préciser votre prix</label>
                            <Input
                                min={25}
                                
                                onChange={(e) => {
                                    setPrice(generateNumberPrice(parseFloat(e.target.value)) || 0)
                                }}
                                className={'className="pl-10 pr-4 h-11 bg-background border-0 rounded-xl text-sm focus-visible:ring-(--primary)"'}
                                value={price.toString()} />
                            <div className='flex gap-2 items-center'>
                                <Button
                                    variant={price === 0 ? 'disabled' : 'primary'}
                                    size='sm'
                                    onClick={() => {
                                        if (cartItem) {
                                            onUpdate?.(cartItem.productId, price);
                                        } else {
                                            onAdd(price);
                                        }
                                    }}
                                    disabled={price === 0}
                                    className="w-full h-11 flex items-center justify-center rounded-xl font-semibold gap-2 mt-auto"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    {cartItem ? "Mettre à jour le panier" : "Ajouter au panier"}
                                </Button>
                                {cartItem &&
                                    <div className="flex items-center gap-2 ">
                                        <button
                                            onClick={() => onRemove?.(cartItem.productId)}
                                            className="ml-auto p-1.5 text-(--muted-foreground) hover:text-(--destructive) transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}