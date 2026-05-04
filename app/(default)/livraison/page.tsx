"use client"
import React from 'react';
import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const zones = [
    { ville: 'Yaoundé', delai: '24h ouvrées', frais: 'Gratuit dès 50 000 FCFA', standard: '2 500 FCFA' },
    { ville: 'Bafoussam', delai: '2-3 jours', frais: 'Gratuit dès 75 000 FCFA', standard: '4 000 FCFA' },
    { ville: 'Garoua', delai: '3-5 jours', frais: 'Gratuit dès 75 000 FCFA', standard: '5 000 FCFA' },
    { ville: 'Maroua', delai: '3-5 jours', frais: 'Gratuit dès 75 000 FCFA', standard: '5 500 FCFA' },
    { ville: 'Bamenda', delai: '2-4 jours', frais: 'Gratuit dès 75 000 FCFA', standard: '4 500 FCFA' },
    { ville: 'Bertoua', delai: '2-4 jours', frais: 'Gratuit dès 75 000 FCFA', standard: '4 000 FCFA' },
    { ville: 'Autres villes', delai: '4-7 jours', frais: 'Sur devis', standard: 'Sur devis' },
];

const options = [
    {
        icon: Truck,
        title: 'Livraison Standard',
        desc: 'Livraison à domicile selon les délais par zone. Gratuite dès 50 000 FCFA à Yaoundé.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Clock,
        title: 'Livraison Express',
        desc: 'Réception le jour même à Yaoundé pour toute commande passée avant 12h. Frais supplémentaires applicables.',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        icon: Package,
        title: 'Click & Collect',
        desc: 'Retirez votre commande gratuitement dans nos showrooms de Yaoundé sous 2h.',
        color: 'bg-green-50 text-green-600',
    },
];

const infos = [
    'Les commandes passées avant 15h sont expédiées le jour même.',
    'Un SMS de confirmation vous est envoyé à chaque étape.',
    'Notre livreur vous contacte 30 min avant la livraison.',
    'Vérifiez votre colis en présence du livreur avant de signer.',
    'En cas d\'absence, un second passage est planifié gratuitement.',
];

export default function Livraison() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Truck className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Informations de livraison</h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Nous livrons partout au Cameroun. Découvrez nos options et délais de livraison.
                </p>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-3 gap-4">
                {options.map((opt, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border rounded-2xl p-6 text-center space-y-3"
                    >
                        <div className={`w-12 h-12 rounded-xl ${opt.color} flex items-center justify-center mx-auto`}>
                            <opt.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold">{opt.title}</h3>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Zones & Tarifs */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Zones de livraison & tarifs
                </h2>
                <div className="bg-card border rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Ville</th>
                                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Délai</th>
                                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Frais standard</th>
                                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Livraison gratuite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zones.map((z, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-5 py-3 font-medium">{z.ville}</td>
                                    <td className="px-5 py-3 text-muted-foreground">{z.delai}</td>
                                    <td className="px-5 py-3 text-muted-foreground">{z.standard}</td>
                                    <td className="px-5 py-3 text-muted-foreground">{z.frais}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bon à savoir */}
            <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-bold mb-4">Bon à savoir</h2>
                <ul className="space-y-3">
                    {infos.map((info, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {info}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}