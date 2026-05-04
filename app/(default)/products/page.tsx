"use client"
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/app/components/products/product-card';
import ProductGridSkeleton from '@/app/components/products/product-grid-skeleton';
import { SlidersHorizontal, X, ChevronDown, Bug } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Product } from '@/models/product';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts } from '@/store/product/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/store/categories/slice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { addToCart, removeFromCart, updateCartQuantity } from '@/store/cart/slice';
import { Princess_Sofia } from 'next/font/google';

export default function ProductList() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const initialSearch = searchParams.get('search') || '';
    const initialDeals = searchParams.get('deals') === 'true';
    const initialPage = parseInt(searchParams.get('page') || "1");
    const navigate = useRouter()

    const [category, setCategory] = useState(initialCategory);
    const [search, setSearch] = useState(initialSearch);
    const [sort, setSort] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [dealsOnly, setDealsOnly] = useState(initialDeals);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const dispatch = useAppDispatch();
    // const { items: itemsCategories, loading: loadingCategories, error: errorCategories } = useAppSelector((state) => state.categories);
    const { items: itemsProducts, nextPage, prevPage, totalCount, loading: loadingProducts, error: errorProducts } = useAppSelector((state) => state.articles);
    const { items: cart } = useAppSelector((state) => state.cart)
    // useEffect(() => {
    //     dispatch(fetchCategories(1)); // Charge la page 1 au montage
    // }, [dispatch])

    useEffect(() => {
        dispatch(fetchProducts(currentPage)); // Charge la page 1 au montage
    }, [dispatch, currentPage])

    // const getCategoryLabel = useMemo(() => {
    //     return itemsCategories.find(c => c.pk.toString() === category)?.fields.intitule || category;
    // }, [itemsCategories, category])


    const filteredProducts = useMemo(() => {
        let result: Product[] = itemsProducts;

        // if (category !== 'all') {
        //     result = result.filter(p => p.fields.categorie.toString() === category);
        // } else {
        //     result = itemsProducts
        // }
        // if (dealsOnly) {
        //     result = result.filter(p => p.is_deal);
        // }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
            );
        }


        return result;
    }, [itemsProducts, cart, search, sort, dealsOnly]);

    const addProduct = (item: Product, price: number) => {
        dispatch(addToCart({
            productId: item.id,
            name: item.name,
            price: price,
            image_url: item.image_url,
        }))
    }

    function handleRemoveItem(id: number) {
        dispatch(removeFromCart(id))
    }

    function handleUpdateItem(id: number, price: number) {
        dispatch(updateCartQuantity({ productId: id, price }))
    }

    if (errorProducts) return <div className="flex items-center gap-2 justify-center min-h-screen flex-col">
        <Bug size={48} className="text-(--destructive) animate-pulse" />
        <p className="text-(--destructive) text-2xl">Erreur : {errorProducts}</p>
    </div>;
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-(--muted-foreground) mb-2">
                    <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
                    <span>/</span>
                    {/* <span className="text-foreground font-medium">
                        {category !== 'all' ? getCategoryLabel : 'Tous les produits'}
                    </span> */}
                </div>
                {/* <h1 className="text-3xl font-extrabold tracking-tight">
                    {category !== 'all' ? getCategoryLabel : dealsOnly ? 'Offres Flash' : 'Tous les Produits'}
                </h1> */}
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 py-4  flex items-center rounded-xl"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtres
                </Button>





                <div className="ml-auto text-sm text-(--muted-foreground)">
                    {totalCount} produit{totalCount !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Search (expandable) */}
            {showFilters && (
                <div className="mb-6 space-y-4 p-4 bg-(--card) border-(--border) rounded-xl border">
                    <div className='flex gap-2'>
                        {/* {
                            !loadingCategories && <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full max-w-52 rounded-xl py-2 h-9">
                                    <SelectValue placeholder="Catégorie" />
                                </SelectTrigger>
                                <SelectContent position={'popper'}>
                                    <SelectItem value="all">Toutes catégories</SelectItem>
                                    {itemsCategories.map(cat => (
                                        <SelectItem key={cat.pk} value={cat.pk.toString()}>{cat.fields.intitule}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        } */}

                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-full max-w-52 rounded-xl py-2 h-9">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent position={'popper'}>
                                <SelectItem value="newest">Plus récents</SelectItem>
                                <SelectItem value="asc">A-Z</SelectItem>
                                <SelectItem value="desc">Z-A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        placeholder="Rechercher dans cette catégorie..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                    />

                </div>
            )}

            {/* Products Grid */}
            {loadingProducts ? (
                <ProductGridSkeleton />
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-xl font-semibold mb-2">Aucun produit trouvé</p>
                    <p className="text-(--muted-foreground) mb-6">Essayez de modifier vos filtres</p>
                    <button
                        // variant="outline"
                        onClick={() => { setCategory('all'); setSearch(''); setDealsOnly(false); navigate.push("") }}>
                        Réinitialiser les filtres
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product => {
                        const cartItem = cart.find(x => x.productId === product.id);
                        return (
                            <ProductCard
                                cartItem={cartItem}
                                onAdd={(price) => addProduct(product, price)}
                                key={product.id}
                                product={product}
                                onUpdate={(id, quantity) => handleUpdateItem(id, quantity)}
                                onRemove={(id) => handleRemoveItem(id)}
                            />
                        )
                    })}
                    {/* BARRE DE NAVIGATION */}
                    <div className="flex col-span-full justify-between items-center mt-8">
                        <Button
                            disabled={!prevPage}
                            size={"sm"}
                            variant={"ghost"}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Précédent
                        </Button>

                        <span className="font-medium">Page {currentPage}</span>

                        <Button
                            type='button'
                            disabled={!nextPage}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            variant={"ghost"}
                            size={"sm"}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}