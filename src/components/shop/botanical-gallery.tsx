import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

const compositions = [
  { key: 'bamboo', title: 'O frescor do verde', note: 'BAMBU & FOLHAGENS', alt: 'Perfume verde DC Aromas sobre bambu, com folhas sobrepostas ao frasco' },
  { key: 'wood', title: 'A memória da terra', note: 'MADEIRAS & RAÍZES', alt: 'Perfume âmbar DC Aromas entre raízes, musgo e folhas' },
  { key: 'floral', title: 'A delicadeza de florescer', note: 'FLORES & EUCALIPTO', alt: 'Perfume DC Aromas entre lavanda, flores brancas e eucalipto' },
] as const;

export function BotanicalVisual({ hero = false }: { hero?: boolean }) {
  return <div className={`botanical-cutout${hero ? ' botanical-cutout--hero' : ''}`}>
    <div className="botanical-cutout__backdrop" aria-hidden="true" />
    <img src="/images/dc-aromas-bamboo.webp" width={1024} height={1024}
      alt={compositions[0].alt} loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : 'auto'} decoding="async" />
  </div>;
}

export function BotanicalGallery() {
  return <section className="botanical-gallery" aria-labelledby="botanical-heading">
    <div className="section-heading">
      <div><p className="eyebrow">UNIVERSO DC AROMAS</p><h2 id="botanical-heading">A natureza em primeiro plano.</h2><p>Texturas, luz e formas que inspiram nosso universo.</p></div>
      <Link to="/fragrancias" className="text-link">Explorar fragrâncias <ArrowUpRight size={18} /></Link>
    </div>
    <div className="botanical-gallery__grid">
      {compositions.map(({ key, title, note, alt }) => <figure key={key} className={`botanical-card botanical-card--${key}`}>
        {key === 'bamboo' ? <BotanicalVisual /> : <div className="botanical-card__photo"><img src={`/images/dc-aromas-${key}.webp`} alt={alt} width={1024} height={1024} loading="lazy" decoding="async" /></div>}
        <figcaption><p className="eyebrow">{note}</p><h3>{title}</h3></figcaption>
      </figure>)}
    </div>
    <p className="botanical-gallery__note">Composições ilustrativas da marca.</p>
  </section>;
}
