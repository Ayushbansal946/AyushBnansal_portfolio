import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from '../components/ContactForm';
import emailjs from '@emailjs/browser';

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(),
  },
}));

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all inputs and send button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell me about your project/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows error if name is too short', async () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;
    
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), { target: { value: 'A valid project message.' } });
    
    fireEvent.submit(form);

    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it('shows error if email is invalid format', async () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email-format' } });
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), { target: { value: 'A valid project message.' } });

    fireEvent.submit(form);

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it('shows error if message is too short', async () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), { target: { value: 'Hi' } });

    fireEvent.submit(form);

    expect(await screen.findByText(/at least 5 characters/i)).toBeInTheDocument();
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it('submits successfully when form input is valid', async () => {
    (emailjs.sendForm as any).mockResolvedValueOnce({ status: 200, text: 'OK' });
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form')!;

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), { target: { value: 'I would love to design an app with you!' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText(/message sent!/i)).toBeInTheDocument();
  });
});
