import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Mail, Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const STORAGE_KEY = 'supermarket_profile';

export default function ProfileForm() {
    const [form, setForm] = useState({ full_name: '', phone: '', email: '', city: '', neighborhood: '' });
    const [saved, setSaved] = useState(false);
    
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setForm(JSON.parse(stored));
    }, []);

    const handleChange = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleSubmit = () => {

        if (!form.full_name || !form.phone) {
            toast.error('Le nom et le téléphone sont obligatoires');
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
        setSaved(true);
        toast.success('Profil mis à jour !');
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className=" mx-auto rounded-2xl p-6 space-y-5 max-w-lg">
            <h2 className="font-bold text-base">Informations personnelles</h2>
            <p className="text-sm text-(--muted-foreground) -mt-2">Ces informations sont utilisées pour pré-remplir vos futures commandes.</p>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Nom complet *
                </label>
                <Input value={form.full_name} onChange={e => handleChange('full_name', e.target.value)} placeholder="Jean Dupont"  className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)" />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Téléphone *
                </label>
                <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+237 6XX XXX XXX"  className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)" />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                </label>
                <Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="jean@email.com"  className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-(--muted-foreground) flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Ville
                    </label>
                    <Input value={form.city} onChange={e => handleChange('city', e.target.value)} placeholder="Yaoundé" 
                     className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-(--muted-foreground)">Quartier</label>
                    <Input value={form.neighborhood} onChange={e => handleChange('neighborhood', e.target.value)} placeholder="Ngousso"  className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)" />
                </div>
            </div>

            <Button variant='primary' size="lg" type="submit" className="w-full flex items-center justify-center rounded-xl gap-2">
                {saved ? <><CheckCircle2 className="w-4 h-4" /> Enregistré</> : <><Save className="w-4 h-4" /> Enregistrer les modifications</>}
            </Button>
        </form>
    );
}