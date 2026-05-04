"use client"
import HeroSlider from "../components/home/hero-slider";
import CategoryGrid from "../components/home/category-grid";
import FeaturedProducts from "../components/home/featured-products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useMemo } from "react";
// import { fetchCategories } from "@/store/categories/slice"; 
import { fetchProducts } from "@/store/product/slice";
import { addToCart, removeFromCart, updateCartQuantity } from "@/store/cart/slice";
import { Product } from "@/models/product";
import { Bug } from "lucide-react";


export default function Home() {

    const dispatch = useAppDispatch();
    // const { items: itemsCategories, loading: loadingCategories, error: errorCategories } = useAppSelector((state) => state.categories);
    const { items: itemsProducts, loading: loadingProducts, error: errorProducts } = useAppSelector((state) => state.articles);
    const { items: cart } = useAppSelector((state) => state.cart)

    useEffect(() => {
        // dispatch(fetchCategories(1)); // Charge la page 1 au montage
        dispatch(fetchProducts(1)); // Charge la page 1 au montage
    }, [dispatch]);

    const addProduct = (item: Product, price: number) => {
        dispatch(addToCart({
            productId: item.id,
            name: item.name,
            price: price,
            image_url: item.image_url,
            quantity: 0
        }))
    }
    const filteredProducts = useMemo(() => {
        let result: Product[] = itemsProducts;
        return result;
    }, [itemsProducts, cart]);
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
        <div className="max-w-7xl mx-auto px-4 bg-chart-5 py-6 space-y-12">
            <HeroSlider />
            {/* <CategoryGrid data={itemsCategories} /> */}
            {/* <DealsBanner /> */}
            <FeaturedProducts
                cart={cart}
                isLoading={loadingProducts}
                data={filteredProducts}
                title="Nos produits"
                onAdd={addProduct}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
            />
         
        </div>
    );
}
