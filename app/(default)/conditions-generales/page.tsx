"use client"
import React, { useState } from 'react';
import { ScrollText } from 'lucide-react';

const sections = [
    {
        title: '1. Présentation de la société',
        content: `SuperMarket est une société camerounaise spécialisée dans la vente en ligne et en magasin de produits électroniques, informatiques et électroménagers. Siège social : Nkom-nkana, Yaoundé, Cameroun. RCCM : DLA/2020/B/XXXXX — Numéro de contribuable : MXXXXXXXXX.`,
    },
    {
        title: '2. Acceptation des conditions',
        content: `En accédant au site SuperMarket .com et en passant une commande, vous acceptez sans réserve les présentes Conditions Générales de Vente (CGV). SuperMarket se réserve le droit de modifier ces conditions à tout moment. Les CGV applicables sont celles en vigueur au moment de la commande.`,
    },
    {
        title: '3. Produits et disponibilité',
        content: `Les produits présentés sur le site sont proposés dans la limite des stocks disponibles. SuperMarket s'engage à mettre à jour les informations de disponibilité en temps réel. En cas d'indisponibilité après validation d'une commande, SuperMarket contactera le client pour proposer un produit de remplacement ou un remboursement intégral.`,
    },
    {
        title: '4. Prix',
        content: `Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. SuperMarket se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment de la validation de la commande. Les frais de livraison sont indiqués séparément avant la confirmation.`,
    },
    {
        title: '5. Commande',
        content: `La validation de la commande par le client vaut acceptation des présentes CGV. SuperMarket confirme la commande par SMS ou email. Toute commande passée sur le site SuperMarket .com constitue la formation d'un contrat à distance entre le client et Supermarket.`,
    },
    {
        title: '6. Paiement',
        content: `Le paiement est exigible immédiatement à la commande. SuperMarket accepte : Orange Money, MTN Mobile Money, carte bancaire Visa/Mastercard et paiement à la livraison (zones éligibles). En cas de non-paiement ou de fraude avérée, SuperMarket se réserve le droit d'annuler la commande.`,
    },
    {
        title: '7. Livraison',
        content: `Les délais de livraison sont donnés à titre indicatif. SuperMarket ne saurait être tenu responsable des retards dus à un cas de force majeure, à des perturbations du réseau de transport ou à des informations incorrectes fournies par le client. Le risque de perte ou d'endommagement des produits est transféré au client à la livraison.`,
    },
    {
        title: '8. Droit de rétractation et retours',
        content: `Conformément à la politique de retour Supermarket, le client dispose de 7 jours à compter de la réception pour retourner un produit non conforme ou défectueux. Les retours doivent être effectués dans l'emballage d'origine avec tous les accessoires et la facture. Consultez notre page Politique de Retour pour plus de détails.`,
    },
    {
        title: '9. Garantie',
        content: `Tous les produits vendus par SuperMarket bénéficient de la garantie constructeur (12 à 24 mois selon les marques et produits). Cette garantie couvre les défauts de fabrication et non les dommages causés par une mauvaise utilisation, une chute ou un accident. Le service après-vente SuperMarket est disponible dans nos agences de Yaoundé.`,
    },
    {
        title: '10. Responsabilité',
        content: `SuperMarket ne saurait être tenu responsable des dommages indirects résultant de l'utilisation de ses produits. La responsabilité de SuperMarket est limitée au montant de la commande concernée. Les informations techniques des produits (fiches, images, descriptions) sont fournies à titre indicatif et peuvent évoluer sans préavis.`,
    },
    {
        title: '11. Données personnelles',
        content: `Les informations collectées lors d'une commande sont nécessaires au traitement de celle-ci et peuvent être transmises aux partenaires de livraison. Conformément aux lois en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : privacy@SuperMarket .com.`,
    },
    {
        title: '12. Droit applicable',
        content: `Les présentes CGV sont soumises au droit camerounais. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui du siège social de Supermarket, à Yaoundé.`,
    },
];

export default function ConditionsGenerales() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-(--primary)/10 flex items-center justify-center mx-auto">
                    <ScrollText className="w-7 h-7 text-(--primary)" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Conditions Générales de Vente</h1>
                <p className="text-(--muted-foreground)">Dernière mise à jour : Avril 2026</p>
            </div>

            {/* Intro */}
            <div className="bg-(--secondary)/50 rounded-2xl p-6 text-sm text-(--muted-foreground) leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre SuperMarket et ses clients dans le cadre de la vente de produits sur le site <strong className="text-foreground">SuperMarket .com</strong>. Veuillez les lire attentivement avant toute commande.
            </div>

            {/* Sections */}
            <div className="space-y-3">
                {sections.map((section, i) => (
                    <div key={i} className="bg-(--card) border border-(--border) rounded-2xl overflow-hidden">
                        <button
                            onClick={() => setActive(active === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:bg-(--secondary)/30 transition-colors"
                        >
                            {section.title}
                            <span className={`text-(--muted-foreground) transition-transform text-lg ${active === i ? 'rotate-45' : ''}`}>+</span>
                        </button>
                        {active === i && (
                            <div className="px-6 pb-5 text-sm text-(--muted-foreground) leading-relaxed border-(--border) border-t pt-4">
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-(--muted-foreground)">
                Pour toute question relative à ces conditions, contactez-nous à <strong>legal@SuperMarket .com</strong>
            </p>
        </div>
    );
}