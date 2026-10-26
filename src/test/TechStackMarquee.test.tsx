import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProcessSection from '../sections/ProcessSection';

describe('TechStackMarquee in ProcessSection', () => {
  it('renders technologies and tooltips with accessible labels', () => {
    render(<ProcessSection />);
    
    // Check that tooltips for key tools are present
    const figmaItems = screen.getAllByLabelText('Figma');
    expect(figmaItems.length).toBeGreaterThan(0);

    const reactItems = screen.getAllByLabelText('React');
    expect(reactItems.length).toBeGreaterThan(0);

    const chatGptItems = screen.getAllByLabelText('OpenAI ChatGPT');
    expect(chatGptItems.length).toBeGreaterThan(0);

    const geminiItems = screen.getAllByLabelText('Google Gemini');
    expect(geminiItems.length).toBeGreaterThan(0);
  });
});
