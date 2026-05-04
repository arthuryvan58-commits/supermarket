import React, { useState } from 'react';
import { Package, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/app/components/ui/button';
import { Order } from '@/models/command';
import OrderInvoice from './order-invoice';

const STATUS_LABELS = {
    en_attente: { label: 'En attente', color: 'bg-amber-100 text-amber-700' },
    validee: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700' },
    en_livraison: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-700' },
    livree: { label: 'Livrée', color: 'bg-green-100 text-green-700' },
    annulee: { label: 'Annulée', color: 'bg-red-100 text-red-700' },
};

function OrderCard({ order }: { order: Order }) {
    const [expanded, setExpanded] = useState(false);
    const [printing, setPrinting] = useState(false);
    const status = STATUS_LABELS[order.fields.etat_commande] || STATUS_LABELS.en_attente;

    const handlePrint = () => setPrinting(true);

    return (
        <>
            <div className="bg-(--card) border-(--border) border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-(--secondary) flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-(--muted-foreground)" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">{order.fields.numero_commande}</p>
                            <p className="text-xs text-(--muted-foreground)">
                                {new Date(order.fields.date_creation).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>{status.label}</span>
                        <span className="font-bold">{formatPrice(order.fields.prix_total)}</span>
                        <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5 rounded-xl">
                            <Printer className="w-3.5 h-3.5" /> Facture
                        </Button>
                        <button onClick={() => setExpanded(!expanded)} className="p-1 text-(--muted-foreground) hover:text-foreground transition-colors">
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Expanded items */}
                {expanded && (
                    <div className="border-t px-5 py-4 space-y-3">
                        <p className="text-xs font-semibold text-(--muted-foreground) uppercase tracking-wider mb-2">Articles commandés</p>
                        {/* {(order.items || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {item.image_url && (
                                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-secondary" />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-(--muted-foreground)">Qté : {item.quantity} × {formatPrice(item.price)}</p>
                                </div>
                                <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))} */}
                        <div className="border-t pt-3 flex justify-between font-bold">
                            <span>Total</span>
                            <span>{formatPrice(order.fields.prix_total)}</span>
                        </div>
                        {/* <div className="bg-secondary/50 rounded-xl p-3 text-xs text-(--muted-foreground) space-y-1">
                            <p><strong>Livraison :</strong> {order.fields}, {order.customer_city}</p>
                            <p><strong>Contact :</strong> {order.customer_phone}</p>
                        </div> */}
                    </div>
                )}
            </div>

            {printing && <OrderInvoice order={order} onClose={() => setPrinting(false)} />}
        </>
    );
}

export default function OrdersList() {
    // const sessionId = localStorage.getItem('Supermarket_session_id');
    const [isLoading] = useState(false)
    const orders: Order[] = []
    // const { data: orders = [], isLoading } = useQuery({
    //     queryKey: ['my-orders', sessionId],
    //     queryFn: () => sessionId
    //         ? base44.entities.Order.filter({ session_id: sessionId }, '-created_date', 50)
    //         : Promise.resolve([]),
    // });

    // if (!sessionId) {
    //     return (
    //         <div className="text-center py-16 text-(--muted-foreground) space-y-3">
    //             <AlertCircle className="w-12 h-12 mx-auto stroke-1" />
    //             <p className="font-semibold">Aucune commande trouvée</p>
    //             <p className="text-sm">Vos commandes apparaîtront ici après votre premier achat sur cet appareil.</p>
    //         </div>
    //     );
    // }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-(--card) border-(--border) border rounded-2xl h-20 skeleton-shimmer" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16 text-(--muted-foreground) space-y-3">
                <Package className="w-14 h-14 mx-auto stroke-1" />
                <p className="font-semibold">Vous n'avez pas encore de commande</p>
                <a href="/products" className="inline-block mt-2 bg-(--primary) text-(--primary-foreground) px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Découvrir nos produits
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-(--muted-foreground)">{orders.length} commande{orders.length > 1 ? 's' : ''} trouvée{orders.length > 1 ? 's' : ''}</p>
            {orders.map(order => (
                <OrderCard key={order.pk} order={order} />
            ))}
        </div>
    );
}