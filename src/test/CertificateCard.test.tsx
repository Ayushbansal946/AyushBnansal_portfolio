import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CertificateCard } from '../components/CertificateCard';

describe('CertificateCard Component', () => {
  const mockProps = {
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    logoUrl: '/logos/microsoft.png',
    index: 0,
    onClick: vi.fn(),
  };

  it('renders certificate title and issuer', () => {
    render(<CertificateCard {...mockProps} />);
    expect(screen.getByText('Career Essentials in Generative AI')).toBeInTheDocument();
    expect(screen.getByText('Microsoft & LinkedIn')).toBeInTheDocument();
    expect(screen.getByAltText(/microsoft & linkedin logo/i)).toBeInTheDocument();
  });

  it('calls onClick handler when card is clicked', () => {
    render(<CertificateCard {...mockProps} />);
    fireEvent.click(screen.getByText('Career Essentials in Generative AI'));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
