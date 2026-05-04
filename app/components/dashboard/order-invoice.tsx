import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { formatPrice } from '@/lib/formatPrice';
import { Order } from '@/models/command';

export default function OrderInvoice({ order, onClose }: { order: Order, onClose: () => void }) {
    const ref = useRef<null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const orderNum = order.order_number;
    const date = new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <>
            {/* Close button – hidden in print */}
            <div className="print:hidden fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-5 border-b">
                        <h2 className="font-bold text-lg">Aperçu de la facture</h2>
                        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <InvoiceContent order={order} orderNum={orderNum} date={date} />
                    <div className="p-5 border-t flex gap-3">
                        <button
                            onClick={() => window.print()}
                            className="flex-1 bg-foreground text-background py-3 rounded-xl font-semibold hover:bg-foreground/90 transition-colors"
                        >
                            Imprimer / Télécharger PDF
                        </button>
                        <button onClick={onClose} className="px-5 py-3 rounded-xl border font-semibold hover:bg-secondary transition-colors">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            {/* Printable version */}
            <div className="hidden print:block" ref={ref}>
                <InvoiceContent order={order} orderNum={orderNum} date={date} />
            </div>
        </>
    );
}

function InvoiceContent({ order, orderNum, date }: { order: Order, orderNum: string, date: string }) {
    const subtotal = order.total_due;

    return (
        <div className="p-8 text-sm text-gray-800 font-sans">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="text-2xl font-extrabold text-gray-900 mb-1">Supermarket</div>
                    <p className="text-gray-500 text-xs">Nkom-nkana, Yaoundé</p>
                    <p className="text-gray-500 text-xs">+237 233 50 73 00 — contact@Supermarket.cm</p>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">FACTURE</div>
                    <p className="text-gray-600 mt-1">N° {orderNum}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Date : {date}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6" />

            {/* Client info */}
            {/* <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Facturé à</p>
                <p className="font-semibold text-gray-900">{order.customer_name}</p>
                <p className="text-gray-600">{order.customer_phone}</p>
                {order.customer_email && <p className="text-gray-600">{order.customer_email}</p>}
                <p className="text-gray-600">{order.customer_neighborhood}, {order.customer_city}</p>
            </div> */}

            {/* Items table */}
            <table className="w-full mb-6">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Article</th>
                        <th className="text-center py-2 text-xs font-semibold text-gray-500 uppercase">Qté</th>
                        <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Prix unit.</th>
                        <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Total</th>
                    </tr>
                </thead>
                <tbody>
                        {/* {(order.items || []).map((item, i) => (
                            <tr key={i} className="border-b border-gray-100">
                                <td className="py-3 text-gray-800">{item.name}</td>
                                <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                                <td className="py-3 text-right text-gray-600">{formatPrice(item.price)}</td>
                                <td className="py-3 text-right font-medium">{formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))} */}
                </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end">
                <div className="w-56 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Sous-total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Livraison</span>
                        <span>Incluse</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-gray-100 text-center text-gray-400 text-xs">
                Merci pour votre confiance — Supermarket.cm
            </div>
        </div>
    );
}