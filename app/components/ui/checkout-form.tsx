import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, CheckCircle2, User, Phone, MapPin, Mail, Truck, ShoppingBag } from 'lucide-react';
import { clearCart } from '@/lib/cartStore';
import { formatPrice } from '@/lib/formatPrice';
import { toast } from 'sonner';
import { CartProduct } from '@/models/cart-item';

type CheckoutFormProps = {
    cart: CartProduct[],
    total: number,
    onBack: () => void,
    onClose: () => void,
    onCreateOrder: (data: {
        delivery_required: boolean, name: string, tel: string, street: string, city: string, email: string, payment_method: "orange_money" | "mtn_mobile_money"
    }) => void
}
const COMMISSION_RATE = 0.05;

function generateOrderNumber() {
    return 'AGR-' + Date.now().toString(36).toUpperCase();
}
const PAYMENT_METHODS = [
    {
        id: 'orange_money',
        label: 'Orange Money',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-400',
        bgLight: 'bg-orange-500/20',
        emoji: '🟠',
    },
    {
        id: 'mtn_mobile_money',
        label: 'MTN Mobile Money',
        color: 'bg-yellow-400',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-400',
        bgLight: 'bg-yellow-500/20',
        emoji: '🟡',
    },
];
export default function CheckoutForm({ cart, total, onCreateOrder, onClose }: CheckoutFormProps) {
    const [form, setForm] = useState({ full_name: '', phone: '', city: '', neighborhood: '', email: '' });
    const [needDelivery, setNeedDelivery] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('orange_money');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const commission = Math.round(total * COMMISSION_RATE);
    const grandTotal = total + commission;

    const handleChange = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleSubmit = async () => {
        if (!form.full_name || !form.phone || !form.city || !form.neighborhood) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }
        onCreateOrder({
            delivery_required: needDelivery,
            name: form.full_name,
            tel: form.phone,
            street: form.neighborhood,
            city: form.city,
            email: form.email,
            payment_method: paymentMethod as "orange_money" | "mtn_mobile_money"
        });
        setDone(true);

    };

    if (done) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-accent" />
                </div>
                <h2 className="text-xl font-bold">Commande confirmée !</h2>
                <p className="text-muted-foreground text-sm">
                    Merci <span className="font-semibold text-foreground">{form.full_name}</span> ! Nous vous contacterons au <span className="font-semibold text-foreground">{form.phone}</span> pour confirmer votre livraison.
                </p>
                <Button variant='default' size='sm' className="w-full rounded-xl h-12 mt-2" onClick={onClose}>
                    Retour à l'accueil
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-2 flex items-center gap-3">

                <h2 className="font-bold text-base">Vos coordonnées</h2>
                <p className="text-xs text-(--muted-foreground)">Pour organiser la livraison</p>

            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8  ">
                {/* Order summary */}
                <div className='space-y-4'>
                    <div className="bg-(--secondary)/50 rounded-xl px-4 py-2 flex justify-between items-center">
                        <span className="text-sm text-(--muted-foreground)">{cart.length} article{cart.length > 1 ? 's' : ''}</span>
                        <span className="font-bold">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-(--muted-foreground)">Commission (5%)</span>
                        <span>{formatPrice(commission)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold border-(--border) border-t pt-1.5">
                        <span>Total à payer</span>
                        <span className="text-primary">{formatPrice(grandTotal)}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">Mode de retrait</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setNeedDelivery(true)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-xs font-semibold ${needDelivery ? 'border-(--primary) bg-(--primary)/5 text-foreground' : 'border-(--border) text-(--muted-foreground)'
                                }`}
                        >
                            <Truck className="w-5 h-5" />
                            Livraison à domicile
                        </button>
                        <button
                            type="button"
                            onClick={() => setNeedDelivery(false)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-xs font-semibold ${!needDelivery ? 'border-(--primary) bg-(--primary)/5 text-foreground' : 'border-(--border) text-(--muted-foreground)'
                                }`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Retrait sur place
                        </button>
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" /> Nom complet *
                        </label>
                        <Input
                            value={form.full_name}
                            onChange={e => handleChange('full_name', e.target.value)}
                            placeholder="Jean Dupont"
                            className="px-4 h-11 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" /> Téléphone *
                        </label>
                        <Input
                            value={form.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            placeholder="+237 6XX XXX XXX"
                            className="px-4 h-11 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> Ville *
                            </label>
                            <Input
                                value={form.city}
                                onChange={e => handleChange('city', e.target.value)}
                                placeholder="Yaoundé"
                                className="px-4 h-11 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-(--muted-foreground)">Quartier *</label>
                            <Input
                                value={form.neighborhood}
                                onChange={e => handleChange('neighborhood', e.target.value)}
                                placeholder="Ngousso"
                                className="px-4 h-11 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> Email <span className="text-(--muted-foreground)/60">(optionnel)</span>
                        </label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="jean@email.com"
                            className="px-4 h-11 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">Moyen de paiement</p>
                    <div className="space-y-2">
                        {PAYMENT_METHODS.map(pm => (
                            <button
                                key={pm.id}
                                type="button"
                                onClick={() => setPaymentMethod(pm.id)}
                                className={`w-full flex items-center gap-3 p-2 rounded-xl border border-(--border) transition-all text-left ${paymentMethod === pm.id ? `border-(--primary) ${pm.bgLight}` : 'border-(--border)'
                                    }`}
                            >
                                <span className="text-2xl">{pm.emoji}</span>
                                <div>
                                    <p className="text-sm font-bold">{pm.label}</p>

                                </div>
                                {paymentMethod === pm.id && (
                                    <div className="ml-auto w-4 h-4 rounded-full bg-(--primary) flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-(--border) px-6 py-5">
                <Button type="submit" disabled={loading}
                    className="w-full h-10 text-base font-semibold rounded-xl" variant={'primary'} size={'sm'}>
                    {loading ? 'Enregistrement...' : `Confirmer la commande — ${formatPrice(grandTotal)}`}
                </Button>
            </div>
        </form>
    );
}