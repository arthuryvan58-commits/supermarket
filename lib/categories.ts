import { Smartphone, Laptop, Tv, Headphones, Refrigerator, Monitor, Gamepad2, Home, Wifi, Shield } from 'lucide-react';

export const CATEGORIES = [
    { id: 'surgele', label: 'Surgelé', icon: Smartphone },
    { id: 'legume', label: 'Légume', icon: Laptop },
    { id: 'Fruit', label: 'Fruit', icon: Tv },
    { id: 'electromenager', label: 'Gros Électroménager', icon: Refrigerator },
];


export function getCategoryIcon(id: string) {
    return CATEGORIES.find(c => c.id === id)?.icon || Monitor;
}