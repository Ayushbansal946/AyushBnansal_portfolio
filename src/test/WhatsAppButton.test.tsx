import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatsAppButton from '../components/WhatsAppButton';

describe('WhatsAppButton Component', () => {
  it('is initially not in DOM when page is at the top', () => {
    window.scrollY = 0;
    render(<WhatsAppButton />);
    expect(screen.queryByLabelText(/chat on whatsapp/i)).not.toBeInTheDocument();
  });

  it('appears after user scrolls past 300px threshold', async () => {
    render(<WhatsAppButton />);

    act(() => {
      window.scrollY = 350;
      fireEvent.scroll(window);
    });

    const button = await screen.findByLabelText(/chat on whatsapp/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href');
    expect(button.getAttribute('href')).toContain('https://wa.me/917500039393');
    expect(button.getAttribute('href')).toContain(encodeURIComponent('Hi Ayush!'));
  });
});
