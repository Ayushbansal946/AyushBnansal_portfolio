import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navigation from '../components/Navigation';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation Component', () => {
  const renderNav = () => {
    return render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  };

  it('renders logo and availability indicator', () => {
    renderNav();
    expect(screen.getByText('AYUSH')).toBeInTheDocument();
    expect(screen.getByText(/Available for Project/i)).toBeInTheDocument();
  });

  it('opens and closes mobile navigation menu', async () => {
    renderNav();
    
    // Find menu toggle button
    const menuBtn = screen.getByLabelText(/open menu/i);
    expect(menuBtn).toBeInTheDocument();

    // Open menu
    fireEvent.click(menuBtn);

    // Nav links should be visible
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();

    // Close menu with the first close button found
    const closeBtns = screen.getAllByLabelText(/close menu/i);
    expect(closeBtns.length).toBeGreaterThan(0);
    fireEvent.click(closeBtns[0]);

    // Wait for exit animation to finish and element to be removed
    await waitForElementToBeRemoved(() => screen.queryByText('PORTFOLIO'));
    expect(screen.queryByText('PORTFOLIO')).not.toBeInTheDocument();
  });
});
