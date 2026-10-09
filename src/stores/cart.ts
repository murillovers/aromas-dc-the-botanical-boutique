import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartFields, storefrontApiRequest, type Cart } from '@/lib/shopify';
interface State { cart:Cart|null; busy:boolean; error:string|null; open:boolean; setOpen:(open:boolean)=>void; addItem:(id:string)=>Promise<void>; updateQuantity:(id:string,quantity:number)=>Promise<void>; removeItem:(id:string)=>Promise<void>; syncCart:()=>Promise<void> }
type Result={cart:Cart|null;userErrors:{message:string}[]};
export const useCartStore=create<State>()(persist((set,get)=>{
 async function mutate(name:string,declarations:string,args:string,variables:Record<string,unknown>){
  if(get().busy)return;
  set({busy:true,error:null});
   try{const data=await storefrontApiRequest<Record<string,Result>>(`mutation(${declarations}){${name}(${args}){cart{${cartFields}} userErrors{message}}}`,variables); const result=data[name];if(!result)throw new Error('Resposta inesperada da Shopify.');if(result.userErrors.length){const message=result.userErrors.map(e=>e.message).join(', ');if(/cart not found|does not exist/i.test(message))set({cart:null});throw new Error(message);}set({cart:result.cart});}
  catch(e){set({error:e instanceof Error?e.message:'Não foi possível atualizar sua sacola.'});}finally{set({busy:false});}
 }
 return {cart:null,busy:false,error:null,open:false,setOpen:open=>set({open}),
 addItem:async(id)=>{ const cart=get().cart;if(cart)await mutate('cartLinesAdd','$cartId:ID!,$lines:[CartLineInput!]!','cartId:$cartId,lines:$lines',{cartId:cart.id,lines:[{merchandiseId:id,quantity:1}]});else await mutate('cartCreate','$input:CartInput!','input:$input',{input:{lines:[{merchandiseId:id,quantity:1}]}});set({open:true}); },
 updateQuantity:async(id,quantity)=>{const cart=get().cart;if(!cart)return;if(quantity<=0){await get().removeItem(id);return;}await mutate('cartLinesUpdate','$cartId:ID!,$lines:[CartLineUpdateInput!]!','cartId:$cartId,lines:$lines',{cartId:cart.id,lines:[{id,quantity}]});},
 removeItem:async(id)=>{const cart=get().cart;if(!cart)return;await mutate('cartLinesRemove','$cartId:ID!,$lineIds:[ID!]!','cartId:$cartId,lineIds:$lineIds',{cartId:cart.id,lineIds:[id]});},
 syncCart:async()=>{const cart=get().cart;if(!cart||get().busy)return;set({busy:true});try{const data=await storefrontApiRequest<{cart:Cart|null}>(`query($id:ID!){cart(id:$id){${cartFields}}}`,{id:cart.id});set({cart:data.cart?.totalQuantity?data.cart:null});}catch(e){set({error:e instanceof Error?e.message:'Sua sacola não pôde ser atualizada.'});}finally{set({busy:false});}}
 };
},{name:'aromas-dc-cart',partialize:state=>({cart:state.cart}),skipHydration:true}));
