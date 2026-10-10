import {createFileRoute} from '@tanstack/react-router';
import {InspirationCatalog} from '@/components/shop/inspiration-catalog';
import {Collection} from '@/components/shop/collection';
import {productsOptions} from '@/lib/shopify';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/fragrancias')({head:()=>pageHead('Fragrâncias','Explore as fragrâncias naturais Aromas DC por família olfativa.'),loader:({context})=>context.queryClient.ensureQueryData(productsOptions),component:()=> <><InspirationCatalog/><Collection full/></>});
