import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, CheckCircle2, User, Phone, MapPin, Mail } from 'lucide-react';
import { clearCart } from '@/lib/cartStore';
import { formatPrice } from '@/lib/formatPrice';
import { toast } from 'sonner';
import { CartProduct } from '@/models/cart-item';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

type LoginFormProps = {
    onClose: () => void,
    open: boolean,
    onSubmit: (name: string, tel: string, street: string, city: string, email: string) => void,
    isLoading: boolean,
}
export default function LoginForm({ onClose, open, onSubmit, isLoading }: LoginFormProps) {
    const [form, setForm] = useState({ full_name: '', phone: '', city: '', neighborhood: '', email: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleSubmit = async () => {
        if (!form.full_name || !form.phone || !form.city || !form.neighborhood) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }
        onSubmit(form.full_name, form.phone, form.neighborhood, form.city, form.email)

    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle>
                    {" "}
                </DialogTitle>
            </DialogHeader>
            <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl gap-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex  h-fit flex-col overflow-hidden">
                    {/* Header */}
                    <div className="px-6 pt-4 pb-3 flex items-center gap-3">
                        <h2 className="font-bold text-base">Se connecter</h2>
                    </div>

                    <div className=" overflow-y-auto px-6 py-5 space-y-4">

                        {/* Fields */}
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" /> Nom complet *
                                </label>
                                <Input
                                    value={form.full_name}
                                    onChange={e => handleChange('full_name', e.target.value)}
                                    placeholder="Jean Dupont"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" /> Téléphone *
                                </label>
                                <Input
                                    value={form.phone}
                                    onChange={e => handleChange('phone', e.target.value)}
                                    placeholder="+237 6XX XXX XXX"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> Ville *
                                    </label>
                                    <Input
                                        value={form.city}
                                        onChange={e => handleChange('city', e.target.value)}
                                        placeholder="Yaoundé"
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Quartier *</label>
                                    <Input
                                        value={form.neighborhood}
                                        onChange={e => handleChange('neighborhood', e.target.value)}
                                        placeholder="Etoudi"
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" /> Email <span className="text-muted-foreground/60">(optionnel)</span>
                                </label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={e => handleChange('email', e.target.value)}
                                    placeholder="jean@email.com"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className=" px-6 py-2">
                        <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold rounded-xl" variant={'primary'} size={'default'}>
                            {isLoading ? "Chargement..." : "Se connecter"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}