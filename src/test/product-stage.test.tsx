import { test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ProductStage } from '../components/shop/product-stage';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
test('perspective responds to keyboard and touch buttons, resets and stays bounded', () => {
 vi.stubGlobal('matchMedia', () => ({matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn()}));
 const {container} = render(<ProductStage src="/test.webp" alt="Soap" />);
 const stage = screen.getByRole('group', {name:'Apresentação do produto em perspectiva'});
 const frame = container.querySelector('.product-stage__frame') as HTMLElement;
 fireEvent.keyDown(stage, {key:'ArrowRight'});
 expect(frame.style.getPropertyValue('--tilt-y')).toBe('4deg');
 for(let i=0;i<10;i++) fireEvent.click(screen.getByRole('button',{name:'Inclinar para a direita'}));
 expect(frame.style.getPropertyValue('--tilt-y')).toBe('16deg');
 fireEvent.click(screen.getByRole('button',{name:'Centralizar'}));
 expect(frame.style.getPropertyValue('--tilt-y')).toBe('0deg');
});
test('reduced motion keeps image static and removes tilt controls', () => {
 vi.stubGlobal('matchMedia', () => ({matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn()}));
 render(<ProductStage src="/test.webp" alt="Soap" />);
 expect(screen.getByRole('img',{name:'Soap'})).toBeTruthy();
 expect(screen.queryByRole('button',{name:'Inclinar para a direita'})).toBeNull();
});
