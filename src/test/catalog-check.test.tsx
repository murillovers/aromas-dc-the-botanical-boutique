import { test, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { InspirationCatalog } from '../components/shop/inspiration-catalog';
test('catalog filters preserve all items and details expose the selected inspiration', () => {
 render(<InspirationCatalog />);
 expect(screen.getAllByRole('article')).toHaveLength(5);
 fireEvent.click(screen.getByRole('button', { name: 'Sabonetes', exact: true }));
 expect(screen.getAllByRole('article')).toHaveLength(2);
 expect(screen.queryByRole('heading', { name: 'Verde Bambu' })).toBeNull();
 fireEvent.click(screen.getByRole('button', { name: 'Conhecer Lavanda Serena' }));
 const dialog = screen.getByRole('dialog');
 expect(within(dialog).getByRole('heading', { name: 'Lavanda Serena' })).toBeTruthy();
 expect(within(dialog).getByRole('link').getAttribute('href')).toBe('https://www.instagram.com/aromas_dc/');
 fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
 fireEvent.click(screen.getByRole('button', { name: 'Perfumes', exact: true }));
 expect(screen.getAllByRole('article')).toHaveLength(3);
 fireEvent.click(screen.getByRole('button', { name: 'Todos', exact: true }));
 expect(screen.getAllByRole('article')).toHaveLength(5);
});
