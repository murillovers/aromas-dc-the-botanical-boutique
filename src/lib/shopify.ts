import { queryOptions } from '@tanstack/react-query';
export interface Variant { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; selectedOptions: {name:string; value:string}[] }
export interface Product { id:string; title:string; description:string; handle:string; tags:string[]; images:{edges:{node:{url:string; altText:string|null}}[]}; variants:{edges:{node:Variant}[]}; options:{name:string;values:string[]}[] }
export const families = ['Florais Silvestres', 'Amadeirados Nobres', 'Cítricos Botânicos', 'Especiarias & Âmbar'];
export const money = (amount: number|string, currency='BRL') => new Intl.NumberFormat('pt-BR',{style:'currency',currency}).format(Number(amount));
export async function storefrontApiRequest<T>(query:string, variables:Record<string,unknown> = {}):Promise<T> {
 const response = await fetch('https://aromas-dc-the-botanical-boutique-ex4sj-a0b21j01.myshopify.com/api/2025-07/graphql.json',{method:'POST',headers:{'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':'dceb5d2a2cce641a68da9813c3094bef'},body:JSON.stringify({query,variables})});
 if (!response.ok) { const body=await response.text(); throw new Error(`Shopify [${response.status}]: ${body}`); }
 const result=await response.json(); if(result.errors) throw new Error(result.errors.map((e:{message:string})=>e.message).join(', ')); return result.data;
}
const fields=`id title description handle tags images(first:5){edges{node{url altText}}} options{name values} variants(first:20){edges{node{id title availableForSale price{amount currencyCode} selectedOptions{name value}}}}`;
export const productsOptions = queryOptions({queryKey:['products'],queryFn:async()=>{ const data=await storefrontApiRequest<{products:{edges:{node:Product}[]}}>(`query { products(first:100){edges{node{${fields}}}} }`);return data.products.edges.map(e=>e.node); }});
export const productOptions = (handle:string)=>queryOptions({queryKey:['product',handle],queryFn:async()=>{ const data=await storefrontApiRequest<{product:Product|null}>(`query($handle:String!){product(handle:$handle){${fields}}}`,{handle}); return data.product; }});
export interface CartLine { id:string; quantity:number; merchandise:Variant & {product:{title:string;handle:string;featuredImage:{url:string}|null}} }
export interface Cart { id:string;checkoutUrl:string;totalQuantity:number;cost:{subtotalAmount:{amount:string;currencyCode:string}};lines:{edges:{node:CartLine}[]} }
export const cartFields=`id checkoutUrl totalQuantity cost{subtotalAmount{amount currencyCode}} lines(first:100){edges{node{id quantity merchandise{... on ProductVariant{id title availableForSale price{amount currencyCode} selectedOptions{name value} product{title handle featuredImage{url}}}}}}}`;
export function formatCheckoutUrl(value:string){ const url=new URL(value);url.searchParams.set('channel','online_store');return url.toString(); }
