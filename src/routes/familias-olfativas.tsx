import {createFileRoute,Link} from '@tanstack/react-router';
import {ArrowUpRight,Flower2,Trees,Citrus,Sun} from 'lucide-react';
import {families} from '@/lib/shopify';
import {pageHead} from '@/lib/metadata';
const icons=[Flower2,Trees,Citrus,Sun];const descriptions=['Delicadeza que floresce. Notas de flores, jardins e encontros com a natureza.','Profundidade e presença. A elegância das madeiras e a serenidade da floresta.','Luz e frescor. A energia das cascas cítricas e dos verdes recém-colhidos.','Calor e envolvimento. A riqueza das especiarias e das notas resinosas.'];
export const Route=createFileRoute('/familias-olfativas')({head:()=>pageHead('Famílias olfativas','Descubra florais silvestres, amadeirados nobres, cítricos botânicos e especiarias & âmbar.'),component:()=> <section className="content-page"><p className="eyebrow">UM UNIVERSO DE SENSAÇÕES</p><h1>Famílias olfativas</h1><div className="families-grid">{families.map((f,i)=>{const Icon=icons[i];return <Link to="/fragrancias" className="family-item" key={f}><Icon size={40}/><span className="eyebrow">0{i+1}</span><h2>{f}</h2><p>{descriptions[i]}</p><ArrowUpRight/></Link>;})}</div></section>});
