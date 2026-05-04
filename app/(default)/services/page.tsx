"use client"
import React from 'react';
import { Truck, CreditCard, RotateCcw, Headphones, ShieldCheck, Zap, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Truck,
    title: 'Livraison Rapide',
    color: 'bg-blue-50 text-blue-600',
    badge: 'Gratuite dès 50 000 FCFA',
    items: [
      'Livraison à domicile à Yaoundé sous 24h',
      'Livraison en province sous 2 à 5 jours ouvrables',
      'Suivi de commande en temps réel',
      'Livraison gratuite pour toute commande supérieure à 50 000 FCFA',
      'Livraison Express disponible (frais supplémentaires)',
    ],
  },
  {
    icon: CreditCard,
    title: 'Paiement Flexible',
    color: 'bg-amber-50 text-amber-600',
    badge: 'Orange Money · MTN MoMo · Carte',
    items: [
      'Orange Money — paiement immédiat et sécurisé',
      'MTN Mobile Money — disponible 24h/24',
      'Paiement par carte Visa / Mastercard',
      'Paiement à la livraison (Yaoundé)',
      'Facilité de paiement en 3x sans frais (sur sélection)',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Garantie & SAV',
    color: 'bg-green-50 text-green-600',
    badge: 'Garantie Constructeur',
    items: [
      'Garantie constructeur de 12 à 24 mois selon les produits',
      'Service après-vente agréé sur place à Yaoundé',
      'Remplacement rapide en cas de produit défectueux',
      'Pièces de rechange disponibles en stock',
      'Techniciens certifiés Samsung, LG, Apple et autres',
    ],
  },
  {
    icon: RotateCcw,
    title: 'Retours & Remboursements',
    color: 'bg-purple-50 text-purple-600',
    badge: '7 jours pour changer d\'avis',
    items: [
      'Retour gratuit sous 7 jours après réception',
      'Produit remboursé ou échangé selon votre choix',
      'Procédure simple : contactez notre service client',
      'Remboursement sous 3 à 5 jours ouvrables',
      'Condition : produit non utilisé dans son emballage d\'origine',
    ],
  },
  {
    icon: Headphones,
    title: 'Support Client 24/7',
    color: 'bg-rose-50 text-rose-600',
    badge: 'Toujours disponible',
    items: [
      'Assistance téléphonique 7j/7 de 7h à 22h',
      'Chat en ligne en temps réel',
      'Support par WhatsApp : +237 6XX XXX XXX',
      'Email : support@SuperMarket .com',
      'Réponse garantie sous 2 heures en semaine',
    ],
  },
  {
    icon: Zap,
    title: 'Click & Collect',
    color: 'bg-orange-50 text-orange-600',
    badge: 'Retrait gratuit en magasin',
    items: [
      'Commandez en ligne, retirez en magasin sous 2h',
      'Disponible dans nos agences de Yaoundé',
      'Aucun frais de livraison supplémentaire',
      'Vérifiez votre commande sur place avant de partir',
      'Horaires : Lun–Sam 8h–20h, Dim 10h–17h',
    ],
  },
];

const steps = [
  { icon: '🛒', title: 'Choisissez', desc: 'Parcourez notre catalogue et ajoutez au panier' },
  { icon: '💳', title: 'Payez', desc: 'Orange Money, MTN MoMo, carte ou à la livraison' },
  { icon: '📦', title: 'Expédié', desc: 'Votre commande est préparée et expédiée le jour même' },
  { icon: '🏠', title: 'Livré', desc: 'Recevez à domicile ou retirez en magasin' },
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-(--primary) bg-(--primary)/10 px-4 py-1.5 rounded-full">
          Nos Services
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Une expérience d'achat<br className="hidden sm:block" /> sans compromis
        </h1>
        <p className="text-(--muted-foreground) max-w-xl mx-auto text-base leading-relaxed">
          Chez Supermarket, nous mettons tout en œuvre pour que votre achat soit simple, rapide et sécurisé — du clic à la livraison.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-(--card) rounded-2xl border-(--border) border p-8">
        <h2 className="text-xl font-bold mb-8 text-center">Comment ça marche ?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="text-4xl">{step.icon}</div>
              <div>
                <p className="font-bold">{step.title}</p>
                <p className="text-sm text-(--muted-foreground) mt-1">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute mt-6 ml-32 text-(--muted-foreground)/30 text-2xl">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-(--card) rounded-2xl border border-(--border)  p-6 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
              <service.icon className="w-6 h-6" />
            </div>
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="text-lg font-bold">{service.title}</h3>
              <span className="text-[10px] font-semibold bg-(--secondary) text-(--muted-foreground) px-2 py-1 rounded-lg shrink-0">
                {service.badge}
              </span>
            </div>
            <ul className="space-y-2">
              {service.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-(--muted-foreground)">
                  <span className="text-(--primary) mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Coverage Map Banner */}
      {/* <div className="rounded-2xl bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <MapPin className="w-16 h-16 text-(--primary) shrink-0" />
        <div>
          <h3 className="text-2xl font-bold mb-2">Nous livrons partout au Cameroun</h3>
          <p className="text-background/60 leading-relaxed">
            Yaoundé, Bafoussam, Garoua, Maroua, Bamenda, Bertoua et plus encore. 
            Notre réseau de livraison couvre les 10 régions du pays.
          </p>
        </div>
      </div> */}
    </div>
  );
}