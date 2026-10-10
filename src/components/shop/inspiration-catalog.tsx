import { ProductStage } from '@/components/shop/product-stage';
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
  { name: 'Olhar do Mar', category: 'Sabonetes', image: 'soap-eye', note: 'Olho grego • Azul • Escultural', description: 'Círculos em azul e branco dão forma a um sabonete inspirado no olho grego, apresentado com flores e fibras naturais.' },
  { name: 'Toque de Jardim', category: 'Sabonetes', image: 'soap-massage', note: 'Relevos • Verde sálvia • Artesanal', description: 'Uma barra verde com relevos arredondados, inspirada na forma dos sabonetes massageadores da referência.' },
  { name: 'Flor de Mirra', category: 'Sabonetes', image: 'soap-flower', note: 'Pétalas • Verde-oliva • Botânico', description: 'Pétalas esculpidas e um centro texturizado celebram o desenho de uma flor. Uma composição visual inspirada na referência de mirra.' },
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
      {visible.map(item => <Dialog key={item.image}><article className={`inspiration-card inspiration-card--${item.image}`}>
        <DialogTrigger asChild><button type="button" aria-label={`Abrir ${item.name} em perspectiva`} className={`inspiration-photo${item.image === 'bamboo' ? ' inspiration-photo--bamboo' : ''}`}><img src={`/images/dc-aromas-${item.image}.webp`} alt={`${item.category === 'Perfumes' ? 'Perfume' : 'Sabonete'} DC Aromas — ${item.name}, composição ilustrativa`} width={1254} height={1254} loading="lazy" decoding="async" /><span>{item.category} · Explorar em 3D</span></button></DialogTrigger>
        <div className="inspiration-info"><p className="eyebrow">{item.note}</p><h3>{item.name}</h3>
          <DialogTrigger asChild><Button variant="ghost" className="catalog-details" aria-label={`Conhecer ${item.name}`}>Conhecer inspiração <ArrowUpRight size={16} /></Button></DialogTrigger>
            <DialogContent className="inspiration-dialog inspiration-dialog--immersive"><ProductStage src={`/images/dc-aromas-${item.image}.webp`} alt={`Composição ${item.name} da DC Aromas`} tone={item.image} /><div className="inspiration-dialog__copy"><p className="eyebrow">DC AROMAS · {item.category}</p><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.description} Imagem e nome ilustrativos; consulte as opções disponíveis com a marca.</DialogDescription><Button asChild><a href="https://www.instagram.com/aromas_dc/" target="_blank" rel="noopener noreferrer">Consultar a DC Aromas <ArrowUpRight size={16} /></a></Button></div></DialogContent>
        </div>
      </article></Dialog>)}
    </div>
    <p className="catalog-disclaimer">Imagens e nomes ilustrativos. Consulte a marca para conhecer os produtos disponíveis.</p>
  </section>;
}
