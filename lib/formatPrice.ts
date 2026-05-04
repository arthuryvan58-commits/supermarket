export function formatPrice(amount: number) {
    if (!amount && amount !== 0) return '0 FCFA';
    return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' FCFA';
}
export function generateNumberPrice(amount: number) {
    if (!amount && amount !== 0) return 0;
    const absAmount = Math.abs(amount)
    return absAmount

}

export function formatCameroonNumber(phone: string | number): string {
    // Convertir en string et supprimer les caractères non numériques (espaces, +, -, etc.)
    let cleaned = phone.toString().replace(/\D/g, '');

    // Vérifier si le numéro commence déjà par 237
    if (!cleaned.startsWith('237')) {
        cleaned = '237' + cleaned;
    }
    console.log(cleaned);
    return cleaned;
}