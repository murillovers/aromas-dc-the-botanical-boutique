import { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

const items = [
  { name: 'Verde Bambu', category: 'Perfumes', image: 'bamboo', note: 'Verde • Fresco • Botânico', description: 'Um encontro visual entre folhas de bambu, vidro verde e a leveza da natureza.' },
  { name: 'Flores de Luz', category: 'Perfumes', image: 'floral', note: 'Floral • Delicado • Luminoso', description: 'Lavanda, flores brancas e tons dourados inspiram esta composição delicada.' },
  { name: 'Âmbar da Mata', category: 'Perfumes', image: 'wood', note: 'Madeira • Âmbar • Aconchego', description: 'Raízes, musgo e luz quente traduzem a atmosfera envolvente da floresta.' },
  { name: 'Lavanda Serena', category: 'Sabonetes', image: 'soap-lavender', note: 'Lavanda • Flores • Suavidade', description: 'Barras de inspiração artesanal, com lavanda e uma apresentação em tons suaves.' },
  { name: 'Jardim Botânico', category: 'Sabonetes', image: 'soap-botanical', note: 'Folhas • Verde • Frescor', description: 'Texturas artesanais e folhagens compõem um pequeno ritual inspirado no verde.' },
] as const;

export function InspirationCatalog() {
  const [category, setCategory] = useState('Todos');
  const visible = items.filter(item => category === 'Todos' || item.category === category);
  return <section className="inspiration-catalog" aria-labelledby="inspiration-title">
    <div className="section-heading"><div><p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> RITUAIS QUE ENCANTAM</p><h2 id="inspiration-title">Perfumes & sabonetes</h2><p>Um universo de aromas, texturas e pequenos cuidados.</p></div><span className="catalog-caption">CATÁLOGO DE INSPIRAÇÕES</span></div>
    <div className="catalog-filters" role="group" aria-label="Filtrar inspirações por categoria">
      {['Todos', 'Perfumes', 'Sabonetes'].map(value => <Button key={value} variant={category === value ? 'default' : 'outline'} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</Button>)}
    </div>
    <p className="catalog-count" role="status">{visible.length} inspirações para descobrir</p>
    <div className="inspiration-grid">
      {visible.map(item => <article className="inspiration-card" key={item.image}>
        <div className={`inspiration-photo${item.image === 'bamboo' ? ' inspiration-photo--bamboo' : ''}`}><img src={`/images/dc-aromas-${item.image}.webp`} alt={`${item.category === 'Perfumes' ? 'Perfume' : 'Sabonete'} DC Aromas — ${item.name}, composição ilustrativa`} width={1254} height={1254} loading="lazy" decoding="async" /><span>{item.category}</span></div>
        <div className="inspiration-info"><p className="eyebrow">{item.note}</p><h3>{item.name}</h3>
          <Dialog><DialogTrigger asChild><Button variant="ghost" className="catalog-details" aria-label={`Conhecer ${item.name}`}>Conhecer inspiração <ArrowUpRight size={16} /></Button></DialogTrigger>
            <DialogContent className="inspiration-dialog"><img src={`/images/dc-aromas-${item.image}.webp`} alt={`Composição ${item.name} da DC Aromas`} width={1254} height={1254} /><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.description} Imagem e nome ilustrativos; consulte as opções disponíveis com a marca.</DialogDescription><Button asChild><a href="https://www.instagram.com/aromas_dc/" target="_blank" rel="noopener noreferrer">Consultar a DC Aromas <ArrowUpRight size={16} /></a></Button></DialogContent>
          </Dialog>
        </div>
      </article>)}
    </div>
    <p className="catalog-disclaimer">Imagens e nomes ilustrativos. Consulte a marca para conhecer os produtos disponíveis.</p>
  </section>;
}
