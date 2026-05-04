import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCountdown } from '@/hooks/use-countdown';


export default function DealsBanner() {
    // End of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const { hours, minutes, seconds } = useCountdown(endOfDay);

    const pad = (n: number) => String(n || 0).padStart(2, '0');

    return (
        <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-6 md:p-10">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-primary fill-primary" />
                        <span className="text-sm font-bold text-primary uppercase tracking-wider">Offre de la Semaine</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                        Stock Limité — Offres Exclusives
                    </h2>
                    <p className="text-background/60 text-sm">
                        Profitez de réductions exceptionnelles avant la fin du compteur
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs text-background/50 mr-2">Se termine dans</span>
                    </div>
                    {[
                        { value: pad(hours), label: 'h' },
                        { value: pad(minutes), label: 'm' },
                        { value: pad(seconds), label: 's' },
                    ].map((t, i) => (
                        <div key={i} className="text-center">
                            <div className="bg-background/10 backdrop-blur rounded-lg px-3 py-2 min-w-12">
                                <span className="text-2xl font-bold tabular-nums">{t.value}</span>
                            </div>
                            <span className="text-[10px] text-background/40 mt-1">{t.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Link
                href="/products?deals=true"
                className="inline-flex items-center gap-2 mt-6 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
                Voir les deals
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}