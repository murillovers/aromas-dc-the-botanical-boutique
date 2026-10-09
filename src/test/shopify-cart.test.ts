import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from '@/stores/cart';
import { formatCheckoutUrl, type Cart } from '@/lib/shopify';
const api = vi.hoisted(()=>vi.fn());
vi.mock('@/lib/shopify',async(importOriginal)=>({...await importOriginal<typeof import('@/lib/shopify')>(),storefrontApiRequest:api}));
const cart={id:'cart-test',totalQuantity:1,checkoutUrl:'https://example.com/checkout',cost:{subtotalAmount:{amount:'100',currencyCode:'BRL'}},lines:{edges:[]}} satisfies Cart;
beforeEach(()=>{api.mockReset();useCartStore.setState({cart:null,busy:false,error:null,open:false});});
describe('Shopify bag',()=>{
 it('creates a real API cart for the first item',async()=>{api.mockResolvedValue({cartCreate:{cart,userErrors:[]}});await useCartStore.getState().addItem('gid://shopify/ProductVariant/123');expect(api.mock.calls[0]?.[0]).toContain('cartCreate');expect(api.mock.calls[0]?.[1]).toEqual({input:{lines:[{merchandiseId:'gid://shopify/ProductVariant/123',quantity:1}]}});expect(useCartStore.getState().cart?.id).toBe('cart-test');});
 it('adds subsequent items through cartLinesAdd',async()=>{useCartStore.setState({cart});api.mockResolvedValue({cartLinesAdd:{cart,userErrors:[]}});await useCartStore.getState().addItem('variant-2');expect(api.mock.calls[0]?.[0]).toContain('cartLinesAdd');});
 it('updates quantities through cartLinesUpdate',async()=>{useCartStore.setState({cart});api.mockResolvedValue({cartLinesUpdate:{cart,userErrors:[]}});await useCartStore.getState().updateQuantity('line-1',3);expect(api.mock.calls[0]?.[1]).toEqual({cartId:'cart-test',lines:[{id:'line-1',quantity:3}]});});
 it('removes a line when quantity is zero',async()=>{useCartStore.setState({cart});api.mockResolvedValue({cartLinesRemove:{cart,userErrors:[]}});await useCartStore.getState().updateQuantity('line-1',0);expect(api.mock.calls[0]?.[0]).toContain('cartLinesRemove');expect(api.mock.calls[0]?.[1]).toEqual({cartId:'cart-test',lineIds:['line-1']});});
 it('adds the online-store channel to the returned checkout URL',()=>{expect(new URL(formatCheckoutUrl('https://example.com/checkouts/123?key=abc')).searchParams.get('channel')).toBe('online_store');});
});