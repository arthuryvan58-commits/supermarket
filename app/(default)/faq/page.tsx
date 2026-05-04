"use client"
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqs = [
    {
        category: 'Commandes',
        items: [
            { q: 'Comment passer une commande ?', a: 'Ajoutez les produits souhaités à votre panier, puis cliquez sur "Commander". Remplissez vos coordonnées et choisissez votre mode de paiement. Vous recevrez une confirmation par SMS ou email.' },
            { q: 'Puis-je modifier ma commande après l\'avoir passée ?', a: 'Vous pouvez modifier votre commande dans les 30 minutes suivant la validation, en nous contactant par téléphone ou WhatsApp. Au-delà, la commande est déjà en cours de préparation.' },
            { q: 'Comment suivre ma commande ?', a: 'Un numéro de suivi vous est communiqué par SMS dès l\'expédition de votre colis. Vous pouvez également contacter notre service client pour obtenir des informations en temps réel.' },
            { q: 'Puis-je annuler ma commande ?', a: 'L\'annulation est possible avant l\'expédition. Contactez-nous rapidement par téléphone ou WhatsApp. Si le colis est déjà expédié, vous pouvez refuser la livraison ou effectuer un retour.' },
        ],
    },
    {
        category: 'Paiement',
        items: [
            { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons Orange Money, MTN Mobile Money, les cartes bancaires Visa/Mastercard, et le paiement à la livraison (disponible à Yaoundé).' },
            { q: 'Le paiement en ligne est-il sécurisé ?', a: 'Oui, toutes les transactions sont cryptées et sécurisées. Vos données bancaires ne sont jamais stockées sur nos serveurs.' },
            { q: 'Proposez-vous le paiement en plusieurs fois ?', a: 'Oui, nous proposons le paiement en 3 fois sans frais pour certains produits éligibles. Cette option est indiquée sur la fiche produit.' },
        ],
    },
    {
        category: 'Livraison',
        items: [
            { q: 'Quels sont les délais de livraison ?', a: 'À Yaoundé : 24h ouvrées. Dans les autres villes : 2 à 5 jours ouvrés. La livraison express est disponible sur demande.' },
            { q: 'La livraison est-elle gratuite ?', a: 'La livraison est gratuite pour toute commande supérieure à 50 000 FCFA. En dessous de ce montant, des frais de livraison s\'appliquent selon votre localisation.' },
            { q: 'Livrez-vous en province ?', a: 'Oui, nous livrons dans les 10 régions du Cameroun. Contactez-nous pour obtenir les frais et délais spécifiques à votre ville.' },
        ],
    },
    {
        category: 'Garantie & SAV',
        items: [
            { q: 'Quelle est la durée de la garantie ?', a: 'Tous nos produits bénéficient de la garantie constructeur (12 à 24 mois selon les produits). Cette garantie couvre les défauts de fabrication.' },
            { q: 'Que faire si mon produit est défectueux ?', a: 'Contactez notre SAV dans les 48h suivant la réception. Nous procéderons à un échange ou un remboursement selon votre préférence et la disponibilité du produit.' },
            { q: 'Où se trouve votre service après-vente ?', a: 'Notre SAV est situé dans nos agences de Yaoundé. Vous pouvez également nous contacter à distance par téléphone ou WhatsApp.' },
        ],
    },
];

function FaqItem({ q, a }: { q: string, a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-(--border) last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-4 text-left gap-4"
            >
                <span className="font-medium text-sm">{q}</span>
                <ChevronDown className={`w-4 h-4 text-(--muted-foreground) shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm text-(--muted-foreground) leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-(--primary)/10 flex items-center justify-center mx-auto">
                    <HelpCircle className="w-7 h-7 text-(--primary)" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Questions fréquentes</h1>
                <p className="text-(--muted-foreground)">Trouvez rapidement une réponse à vos questions.</p>
            </div>

            {/* Sections */}
            {faqs.map((section, i) => (
                <div key={i} className="bg-card rounded-2xl border border-(--border) p-6">
                    <h2 className="text-base font-bold mb-4 text-(--primary)">{section.category}</h2>
                    {section.items.map((item, j) => (
                        <FaqItem key={j} q={item.q} a={item.a} />
                    ))}
                </div>
            ))}

            {/* CTA */}
            <div className="text-center bg-(--secondary)/50 rounded-2xl p-8">
                <p className="font-semibold mb-2">Vous n'avez pas trouvé votre réponse ?</p>
                <p className="text-sm text-(--muted-foreground) mb-4">Notre équipe est disponible 7j/7 de 7h à 22h</p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-(--primary) text-(--primary-foreground) px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                    Contactez-nous
                </Link>
            </div>
        </div>
    );
}