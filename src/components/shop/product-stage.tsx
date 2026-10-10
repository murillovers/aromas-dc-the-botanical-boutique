import { useEffect, useId, useRef, useState } from 'react';
import { RotateCcw, RotateCw, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = { src: string; alt: string; tone?: string };
export function ProductStage({ src, alt, tone = 'botanical' }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const [reduced, setReduced] = useState(true);
  const hint = useId();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const tilt = (x: number, y: number) => {
    angle.current = Math.max(-16, Math.min(16, y));
    frame.current?.style.setProperty('--tilt-x', `${reduced ? 0 : x}deg`);
    frame.current?.style.setProperty('--tilt-y', `${reduced ? 0 : angle.current}deg`);
  };
  useEffect(() => {
    if (reduced) {
      frame.current?.style.setProperty('--tilt-x', '0deg');
      frame.current?.style.setProperty('--tilt-y', '0deg');
    }
  }, [reduced]);
  return <div className={`product-stage product-stage--${tone}`}>
    <div className="product-stage__viewport" role="group" aria-label="Apresentação do produto em perspectiva" aria-describedby={hint} tabIndex={reduced ? -1 : 0}
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        tilt((.5 - (event.clientY - bounds.top) / bounds.height) * 14, ((event.clientX - bounds.left) / bounds.width - .5) * 24);
      }} onPointerLeave={() => tilt(0, 0)} onBlur={() => tilt(0, 0)}
      onKeyDown={event => {
        if (reduced) return;
        if (['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) {
          event.preventDefault();
          tilt(0, event.key === 'Home' ? 0 : angle.current + (event.key === 'ArrowLeft' ? -4 : 4));
        }
      }}>
      <div className="product-stage__halo" aria-hidden="true" />
      <div className="product-stage__entrance"><div ref={frame} className="product-stage__frame">
        <img src={src} alt={alt} width={1254} height={1254} draggable={false} decoding="async" />
        <span className="product-stage__shine" aria-hidden="true" />
        <span className="product-stage__signature" aria-hidden="true">DC AROMAS · ATELIÊ BOTÂNICO</span>
      </div></div>
    </div>
    <p id={hint} className="product-stage__hint">{reduced ? 'Visualização estática: movimento reduzido ativado.' : 'Explore a perspectiva com o mouse, as setas ou os botões.'}</p>
    {!reduced && <div className="product-stage__controls" role="group" aria-label="Ajustar perspectiva">
      <Button variant="outline" size="icon" aria-label="Inclinar para a esquerda" onClick={() => tilt(0, angle.current - 4)}><RotateCcw size={17} /></Button>
      <Button variant="outline" onClick={() => tilt(0, 0)}><MoveHorizontal size={17} /> Centralizar</Button>
      <Button variant="outline" size="icon" aria-label="Inclinar para a direita" onClick={() => tilt(0, angle.current + 4)}><RotateCw size={17} /></Button>
    </div>}
  </div>;
}
