import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/models/category';


export default function CategoryGrid({ data }: { data: Category[] }) {

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Catégories</h2>
                <Link href="/products" className="text-sm font-medium text-(--primary) hover:underline">
                    Tout voir
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {data.map((cat, i) => (
                    <motion.div
                        key={cat.pk}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <Link
                            href={`/products?category=${cat.pk}`}
                            className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card hover:bg-(--primary)/5 border border-transparent hover:border-(--primary)/20 transition-all duration-300"
                        >
                            {/* <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-(--primary)/10 transition-colors">
                                <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-(--primary) transition-colors" />
                            </div> */}      
                            <span className="text-xs font-semibold text-center leading-tight">
                                {cat.fields.intitule}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}