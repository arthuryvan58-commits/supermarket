export interface Category {
    pk: number,
    fields: {
        code: string,
        intitule: string,
        unite_vente: string,
        suivi_stock: boolean
    }
}