import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/sheet';
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getCartTotal } from '@/lib/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { CartProduct } from '@/models/cart-item';
import { formatPrice } from '@/lib/formatPrice';
import CheckoutForm from './checkout-form';
import { Input } from './input';

type CartDrawerProps = {
  open: boolean,
  isLoading: boolean,
  error: string | null,
  data: CartProduct[],
  onRemove: (value: number) => void,
  onClose: () => void,
  onCancel: () => void,
  onClear: () => void,
  onUpdate: (id: number, price: number) => void,
  onCreateOrder: (data: {
    delivery_required: boolean, name: string, tel: string, street: string, city: string, email: string, payment_method: "orange_money" | "mtn_mobile_money"
  }) => void
}
export default function CartDrawer({ open, isLoading, onCancel, error, onCreateOrder, onClose, data, onRemove, onClear, onUpdate }: CartDrawerProps) {
  const total = getCartTotal(data);
  const [checkout, setCheckout] = useState(false);

  if (!open) {
    return
  }


  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-(--border)">
          <SheetTitle className="flex items-center gap-2">
            {
              checkout ? <button onClick={() => setCheckout(false)}>
                <ArrowLeft className="w-5 h-5" />
              </button> : <ShoppingBag className="w-5 h-5" />
            }
            {
              checkout ? '' : 'Mon Panier'
            }
            {checkout ? '' : <div className="flex  items-center gap-2 left-3 bg-(--secondary) border border-(--border) text-(--secondary-foreground) text-xs font-bold px-2.5 py-1 rounded-lg">
              {data.length}
            </div>}
          </SheetTitle>
        </SheetHeader>

        {
          isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-(--muted-foreground) text-sm">Chargement...</p>
            </div>
          )
        }
        {
          error && (
            <div className="flex-1 flex flex-col gap-4 items-center justify-center">
              <p className="text-(--destructive) text-sm">{error}</p>
              <div className='flex items-center gap-4 mt-4'>
                <Button onClick={onCancel} variant={'icon'} size={'sm'}>Retour</Button>
              </div>
            </div>
          )
        }
        {
          !isLoading && !error && (
            <>
              {checkout ? (
                <CheckoutForm
                  cart={data}
                  total={total}
                  onBack={() => setCheckout(false)}
                  onClose={() => onClose()}
                  onCreateOrder={onCreateOrder}
                />
              ) : (
                <>

                  {data.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-(--muted-foreground)">
                      <ShoppingBag className="w-16 h-16 stroke-1" />
                      <p className="text-lg font-medium">Votre panier est vide</p>
                      <Button onClick={() => onClose()} variant="outline" className={''} size={'default'} asChild={false}>
                        Continuer mes achats
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                        <AnimatePresence>
                          {data.map((item) => (
                            <motion.div
                              key={item.productId}
                              layout
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex gap-4 p-3 rounded-xl bg-(--secondary)/50"
                            >
                              <div className="w-20 h-20 rounded-lg bg-(--secondary) overflow-hidden shrink-0">

                                {item.image_url ? (
                                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-(--muted-foreground)/30 flex items-center justify-center text-(--muted-foreground)">
                                    <ShoppingCart className="w-6 h-6 stroke-1" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{item.name}</p>
                                <p className="text-sm font-bold text-(--primary) mt-1">{formatPrice(item.price)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Input
                                    onChange={(e) => onUpdate(item.productId, parseFloat(e.target.value) || 0)}
                                    className={'className="pl-10 pr-4 h-11 bg-(--secondary)/80 border-0 rounded-xl text-sm focus-visible:ring-(--primary)"'}
                                    value={item.price.toString()} />
                                  <button
                                    onClick={() => onRemove(item.productId)}
                                    className="ml-auto p-1.5 text-(--muted-foreground) hover:text-(--destructive) transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="border-t border-(--border) px-6 py-5 space-y-4">
                        <div className="flex bg-(--accent)/10 px-6 py-3 rounded-2xl justify-between items-center">
                          <span className="text-(--muted-foreground) text-sm">Sous-total</span>
                          <span className=" font-bold">{formatPrice(total)}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <Button onClick={() => setCheckout(true)} className="w-full flex h-10 text-base font-semibold justify-center items-center rounded-xl gap-2" variant={"primary"} size={'sm'} asChild={false}>
                            Commander
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                          <button title='Vider le panier' onClick={onClear} className="ml-auto p-1.5 text-(--destructive) opacity-60 hover:opacity-100 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )
        }


      </SheetContent>
    </Sheet>
  );
}