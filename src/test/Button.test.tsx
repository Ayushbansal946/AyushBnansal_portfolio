import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports link rendering when as="a" and href is provided', () => {
    render(<Button as="a" href="https://example.com">Visit Link</Button>);
    const link = screen.getByRole('link', { name: /visit link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders secondary variant without crashing', () => {
    render(<Button variant="secondary">Secondary Action</Button>);
    expect(screen.getByRole('button', { name: /secondary action/i })).toBeInTheDocument();
  });
});
