
import React from 'react';
import { Phone, Mail, MapPin, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-foreground text-background/80">
            {/* Trust Badges */}
            <div className="border-b border-background/10">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { icon: Truck, title: 'Livraison Rapide', desc: 'Yaoundé' },
                        { icon: ShieldCheck, title: 'Paiement Sécurisé', desc: 'Mobile Money & Carte' },
                        { icon: Headphones, title: 'Support 24/7', desc: 'Appelez-nous' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-background/10">
                                <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-background">{item.title}</p>
                                <p className="text-xs text-background/50">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                     <img src={"/img-20241111-wa0005-removebg-preview.png"} className='w-20 object-contain h-20'></img>
                    <p className="text-sm text-background/50 leading-relaxed">
                        Votre destination N°1 pour l&apos;alimentation générales au Cameroun.
                    </p>
                </div>

                {/* <div>
                    <h4 className="font-semibold text-background mb-4 text-sm">Catégories</h4>
                    <div className="space-y-2">
                        {['Smartphones', 'Laptops', 'Télévisions', 'Électroménager'].map(cat => (
                            <Link key={cat} href="/products" className="block text-sm text-background/50 hover:text-primary transition-colors">
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div> */}

                <div>
                    <h4 className="font-semibold text-background mb-4 text-sm">Service Client</h4>
                    <div className="space-y-2 flex flex-col">
                        {[{ label: "FAQ", link: '/faq' },
                        { label: "Livraison", link: "/livraison" },
                        { label: "Conditions générales", link: "/conditions-generales" }

                        ].map((item, index: number) => (
                            <Link href={item.link} key={index} className="text-sm text-background/50">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-background mb-4 text-sm">Contact</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-background/50">
                            <Phone className="w-4 h-4" /> +237 233 50 73 00
                        </div>
                        <div className="flex items-center gap-2 text-sm text-background/50">
                            <Mail className="w-4 h-4" /> contact@SuperMarket .cm
                        </div>
                        <div className="flex items-center gap-2 text-sm text-background/50">
                            <MapPin className="w-4 h-4" /> Essos, mvog-mbi et Nkom-Nkana, Yaoundé, Cameroun
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-background/10 py-5 text-center text-xs text-background/30">
                © 2026 SuperMarket . Tous droits réservés.
            </div>
        </footer>
    );
}