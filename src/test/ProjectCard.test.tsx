import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from '../components/ProjectCard';

describe('ProjectCard Component', () => {
  const mockProject = {
    num: '01',
    title: 'FOUNDRY',
    subtitle: 'Male Accessories',
    description: 'A premium mobile application interface for accessories.',
    images: ['/images/male-accessories.jpg'],
    tags: ['Figma', 'UI Design', 'Mobile App'],
    type: 'Mobile App',
    tools: 'Figma, Illustrator',
    details: [
      'Designed a sleek, dark-mode focused UI.',
      'Prototyped seamless checkout flow.'
    ]
  };

  it('renders project basic details', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('01.')).toBeInTheDocument();
    expect(screen.getByText('FOUNDRY')).toBeInTheDocument();
    expect(screen.getByText('A premium mobile application interface for accessories.')).toBeInTheDocument();
  });

  it('toggles expansion to show project details on click', () => {
    render(<ProjectCard {...mockProject} />);
    
    // Details should not be visible initially
    expect(screen.queryByText('Designed a sleek, dark-mode focused UI.')).not.toBeInTheDocument();

    // Click the card's title area
    fireEvent.click(screen.getByText('FOUNDRY'));

    // Details should now be expanded
    expect(screen.getByText('Designed a sleek, dark-mode focused UI.')).toBeInTheDocument();
    expect(screen.getByText('Prototyped seamless checkout flow.')).toBeInTheDocument();
  });
});
