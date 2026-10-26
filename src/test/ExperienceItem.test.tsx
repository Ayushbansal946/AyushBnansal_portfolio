import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceItem from '../components/ExperienceItem';

describe('ExperienceItem Component', () => {
  const mockExp = {
    number: '01',
    role: 'Freelance UI/UX Designer',
    company: 'Self-Employed',
    date: 'Jun 2025 – Present',
    tools: ['Figma', 'Claude AI'],
    bullets: [
      'Designed and delivered modern interfaces for clients.',
      'Managed end-to-end design processes.'
    ]
  };

  it('renders role, company, date, and number', () => {
    render(<ExperienceItem {...mockExp} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Freelance UI/UX Designer')).toBeInTheDocument();
    expect(screen.getByText('Self-Employed')).toBeInTheDocument();
    expect(screen.getByText('Jun 2025 – Present')).toBeInTheDocument();
  });

  it('expands on click to display tools and bullets', () => {
    render(<ExperienceItem {...mockExp} />);
    
    // Not visible initially
    expect(screen.queryByText('Figma')).not.toBeInTheDocument();

    // Click row
    fireEvent.click(screen.getByText('Freelance UI/UX Designer'));

    // Visible after expanding
    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('Claude AI')).toBeInTheDocument();
    expect(screen.getByText('Designed and delivered modern interfaces for clients.')).toBeInTheDocument();
  });
});
