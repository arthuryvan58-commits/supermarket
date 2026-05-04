"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// import { formatPrice } from '@/lib/formatPrice';
// import { getCategoryLabel } from '@/lib/categories';
// import { addToCart } from '@/lib/cartStore';
// import SpecBadge from '@/components/product/SpecBadge';
// import ReviewList from '@/components/product/ReviewList';
// import { ShoppingCart, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw, ChevronLeft, Package, Zap } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/');
  const productId = pathParts[pathParts.length - 1];

  const [quantity, setQuantity] = useState(1);
  const navigate = useRouter();

//   const { data: product, isLoading } = useQuery({
//     queryKey: ['product', productId],
//     queryFn: () => base44.entities.Product.filter({ id: productId }),
//     select: (data) => data?.[0],
//     enabled: !!productId,
//   });

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-2 gap-10">
//           <div className="aspect-square skeleton-shimmer rounded-2xl" />
//           <div className="space-y-4">
//             <div className="h-4 w-24 skeleton-shimmer rounded" />
//             <div className="h-8 w-3/4 skeleton-shimmer rounded" />
//             <div className="h-6 w-32 skeleton-shimmer rounded" />
//             <div className="h-24 w-full skeleton-shimmer rounded" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-24 text-center">
//         <p className="text-xl font-semibold mb-4">Produit introuvable</p>
//         <Button variant="outline" onClick={() => navigate('/products')}>
//           Retour aux produits
//         </Button>
//       </div>
//     );
//   }

//   const discount = product.original_price
//     ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
//     : 0;

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     toast.success(`${product.name} ajouté au panier`);
//   };

  return (
    // <div className="max-w-7xl mx-auto px-4 py-6">
    //   {/* Breadcrumb */}
    //   <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
    //     <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
    //     <span>/</span>
    //     <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">
    //       {getCategoryLabel(product.category)}
    //     </Link>
    //     <span>/</span>
    //     <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
    //   </div>

    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    //     className="grid md:grid-cols-2 gap-10"
    //   >
    //     {/* Image */}
    //     <div className="relative aspect-square rounded-2xl bg-secondary/30 overflow-hidden">
    //       {product.image_url ? (
    //         <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
    //       ) : (
    //         <div className="w-full h-full flex items-center justify-center text-muted-foreground">
    //           <Package className="w-24 h-24 stroke-1" />
    //         </div>
    //       )}
    //       {discount > 0 && (
    //         <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-xl">
    //           -{discount}%
    //         </div>
    //       )}
    //       {product.is_deal && (
    //         <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
    //           <Zap className="w-4 h-4" /> Deal
    //         </div>
    //       )}
    //     </div>

    //     {/* Details */}
    //     <div className="flex flex-col">
    //       {product.brand && (
    //         <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">
    //           {product.brand}
    //         </p>
    //       )}
    //       <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
    //         {product.name}
    //       </h1>

    //       {/* Rating */}
    //       {product.rating && (
    //         <div className="flex items-center gap-2 mb-4">
    //           <div className="flex items-center gap-0.5">
    //             {Array.from({ length: 5 }).map((_, i) => (
    //               <Star
    //                 key={i}
    //                 className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
    //               />
    //             ))}
    //           </div>
    //           <span className="text-sm text-muted-foreground">{product.rating}/5</span>
    //         </div>
    //       )}

    //       {/* Price */}
    //       <div className="flex items-baseline gap-3 mb-6">
    //         <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
    //         {product.original_price && (
    //           <span className="text-lg text-muted-foreground line-through">
    //             {formatPrice(product.original_price)}
    //           </span>
    //         )}
    //       </div>

    //       {/* Specs */}
    //       {product.specs?.length > 0 && (
    //         <div className="flex flex-wrap gap-2 mb-6">
    //           {product.specs.map((spec, i) => (
    //             <SpecBadge key={i} label={spec.label} value={spec.value} />
    //           ))}
    //         </div>
    //       )}

    //       {/* Description */}
    //       {product.description && (
    //         <p className="text-muted-foreground text-sm leading-relaxed mb-6">
    //           {product.description}
    //         </p>
    //       )}

    //       {/* Stock */}
    //       {product.stock > 0 && (
    //         <div className="flex items-center gap-2 mb-6">
    //           <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
    //           <span className="text-sm font-medium text-accent">
    //             En stock — {product.stock} disponible{product.stock > 1 ? 's' : ''}
    //           </span>
    //         </div>
    //       )}

    //       <Separator className="mb-6" />

    //       {/* Quantity & Add to Cart */}
    //       <div className="flex items-center gap-4 mb-6">
    //         <div className="flex items-center border rounded-xl overflow-hidden">
    //           <button
    //             onClick={() => setQuantity(Math.max(1, quantity - 1))}
    //             className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
    //           >
    //             <Minus className="w-4 h-4" />
    //           </button>
    //           <span className="w-12 text-center font-semibold">{quantity}</span>
    //           <button
    //             onClick={() => setQuantity(quantity + 1)}
    //             className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
    //           >
    //             <Plus className="w-4 h-4" />
    //           </button>
    //         </div>
    //         <Button
    //           onClick={handleAddToCart}
    //           className="flex-1 h-12 text-base font-semibold rounded-xl gap-2"
    //         >
    //           <ShoppingCart className="w-5 h-5" />
    //           Ajouter au panier
    //         </Button>
    //       </div>

    //       {/* Trust Bar */}
    //       <div className="grid grid-cols-3 gap-3">
    //         {[
    //           { icon: Truck, label: 'Livraison rapide' },
    //           { icon: ShieldCheck, label: 'Garantie incluse' },
    //           { icon: RotateCcw, label: 'Retour 7 jours' },
    //         ].map((item, i) => (
    //           <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/50 text-center">
    //             <item.icon className="w-4 h-4 text-muted-foreground" />
    //             <span className="text-[11px] font-medium text-muted-foreground">{item.label}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </motion.div>

    //   <ReviewList productId={productId} />
    // </div>
    <></>
  );
}