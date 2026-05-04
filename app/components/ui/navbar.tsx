
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './input';
import { CATEGORIES } from '@/lib/categories';

export default function Navbar({ onCartOpen, cartCount }: { onCartOpen: () => void, cartCount: number }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };
    const pathname = usePathname()
    const regexPath = (str: string) => {
        return pathname.includes(str)
    }
    const classLink = {
        active: "hidden md:flex items-center gap-1.5 text-sm font-medium text-(--primary)/80 hover:text-(--primary) transition-colors px-3 py-2",
        default: "hidden md:flex items-center gap-1.5 text-sm font-medium text-(--muted-foreground) hover:text-foreground transition-colors px-3 py-2"
    }
    return (
        <header className="sticky top-0 z-50 w-full">

            {/* Main Nav */}
            <div className="bg-(--card)/80 backdrop-blur-xl border-b border-(--border)/50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
                    {/* Mobile Menu */}
                    <button
                        className="lg:hidden p-2 -ml-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">

                        <img src={"/img-20241111-wa0005-removebg-preview.png"} className='w-20 object-contain h-20'></img>
                    </Link>

                    {/* Search */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch()
                    }} className="flex-1 max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
                            <Input
                                placeholder="Rechercher un produit, une marque..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                            />
                        </div>
                    </form>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <Link href="/products" className={classLink[regexPath('products') ? "active" : "default"]}>
                            Produits
                        </Link>
                        <Link href="/services" className={classLink[regexPath('services') ? "active" : "default"]}>
                            Services
                        </Link>
                        <Link href="/contact" className={classLink[regexPath('contact') ? "active" : "default"]}>
                            Contact
                        </Link>
                        <Link href="/suivi" className={classLink[regexPath('suivi') ? "active" : "default"]}>
                            Suivi des commandes
                        </Link>
                        <button
                            onClick={onCartOpen}
                            className="relative p-2.5 rounded-xl hover:bg-(--secondary) transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-(--primary) text-(--primary-foreground) text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>


                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-card border-b border-(--border) shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                        {[
                            { label: 'Produits', to: '/products' },
                            { label: 'Promotions', to: '/promotions' },
                            { label: 'Services', to: '/services' },
                            { label: 'Contact', to: '/contact' },
                        ].map(link => (
                            <Link
                                key={link.to}
                                href={link.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-(--secondary) transition-colors text-sm font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t pt-2 mt-2 space-y-1">
                            {CATEGORIES.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.id}`}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-(--secondary) transition-colors text-sm font-medium text-(--muted-foreground)"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}