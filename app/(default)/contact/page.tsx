"use client"
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
// import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';

const infos = [
    { icon: Phone, label: 'Téléphone', value: '+237 622 14 60 23, +237 690 66 43 07', sub: 'Lun–Sam 7h–22h' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+237 622 14 60 23', sub: 'Réponse rapide' },
    { icon: Mail, label: 'Email', value: 'SuperMarket yaounde2026@gmail.cm', sub: 'Réponse sous 2h' },
    { icon: MapPin, label: 'Showroom Yaoundé', value: 'Yaoundé, Nkomkana SIS (face ATHARI-FINANCIAL)', sub: 'Lun–Sam 8h–20h' },
    { icon: Clock, label: 'Support en ligne', value: '7j/7 de 7h à 22h', sub: 'Chat & Email' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

    const handleSubmit = async () => {

        if (!form.name || !form.email || !form.message) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }
        setSending(true);
        // await base44.integrations.Core.SendEmail({
        //     to: 'contact@SuperMarket .com',
        //     subject: `[SuperMarket Contact] ${form.subject || 'Message client'} — ${form.name}`,
        //     body: `Nom : ${form.name}\nEmail : ${form.email}\nSujet : ${form.subject}\n\nMessage :\n${form.message}`,
        // });
        toast.success('Message envoyé ! Nous vous répondrons sous 2 heures.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setSending(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
            {/* Header */}
            <div className="text-center space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-(--primary) bg-(--primary)/10 px-4 py-1.5 rounded-full">
                    Contact
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight">Nous sommes là pour vous</h1>
                <p className="text-(--muted-foreground) max-w-md mx-auto">
                    Une question, une commande, un conseil ? Notre équipe vous répond rapidement.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-(--card) border-(--border) rounded-2xl border p-8 space-y-5"
                >
                    <h2 className="text-xl font-bold">Envoyer un message</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs text-(--muted-foreground) font-medium">Nom complet *</label>
                                <Input
                                    value={form.name}
                                    onChange={e => handleChange('name', e.target.value)}
                                    placeholder="Jean Dupont"
                                    className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"

                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs text-(--muted-foreground) font-medium">Email *</label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={e => handleChange('email', e.target.value)}
                                    placeholder="jean@email.com"
                                    className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs text-(--muted-foreground) font-medium">Sujet</label>
                            <Select onValueChange={v => handleChange('subject', v)}>
                                <SelectTrigger className=" px-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)">
                                    <SelectValue placeholder="Choisir un sujet" />
                                </SelectTrigger>
                                <SelectContent position={'popper'}>
                                    <SelectItem value="commande">Question sur une commande</SelectItem>
                                    <SelectItem value="produit">Renseignement produit</SelectItem>
                                    <SelectItem value="livraison">Suivi de livraison</SelectItem>
                                    <SelectItem value="retour">Retour / Remboursement</SelectItem>
                                    <SelectItem value="garantie">Garantie & SAV</SelectItem>
                                    <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs text-(--muted-foreground) font-medium">Message *</label>
                            <Textarea
                                value={form.message}
                                onChange={e => handleChange('message', e.target.value)}
                                placeholder="Décrivez votre demande en détail..."
                                className=" px-4 h-52  bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"
                                rows={5}

                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={sending}
                            className="w-full h-12 rounded-xl flex justify-center items-center text-base font-semibold gap-2" size={'default'} variant={"primary"}>
                            <Send className="w-4 h-4" />
                            {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                        </Button>
                    </form>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="grid sm:grid-cols-1  gap-4">
                        {infos.map((info, i) => (
                            <div key={i} className="bg-(--card) overflow-hidden border-(--border) rounded-xl border p-5 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-(--primary)/10 flex items-center justify-center shrink-0">
                                    <info.icon className="w-5 h-5 text-(--primary)" />
                                </div>
                                <div>
                                    <p className="text-xs text-(--muted-foreground) font-medium mb-0.5">{info.label}</p>
                                    <p className="text-sm font-semibold">{info.value}</p>
                                    <p className="text-xs text-(--muted-foreground)">{info.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="bg-(--card) border-(--border) rounded-xl border p-6">
                        <p className="font-semibold mb-4">Suivez-nous</p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                {/* <Facebook className="w-4 h-4" />  */}
                                Facebook
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                {/* <Instagram className="w-4 h-4" />  */}
                                Instagram
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
    );
}