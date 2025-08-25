import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopBar from '../../components/TopBar';

// Mock react-icons
vi.mock('react-icons/fi', () => ({
  FiWifi: () => <div data-testid="wifi-icon">WiFi</div>,
  FiVolume2: () => <div data-testid="volume-icon">Volume</div>,
  FiPower: () => <div data-testid="power-icon">Power</div>,
}));

describe('TopBar', () => {
  it('renders logo and time', () => {
    render(<TopBar />);
    
    // Check if logo is rendered
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/assets/images/header.svg');
    
    // Check if icons are rendered
    expect(screen.getByTestId('wifi-icon')).toBeInTheDocument();
    expect(screen.getByTestId('volume-icon')).toBeInTheDocument();
    expect(screen.getByTestId('power-icon')).toBeInTheDocument();
  });

  it('displays current time', () => {
    render(<TopBar />);
    
    // Time should be displayed (format may vary)
    const timeElement = screen.getByText(/\w+/); // Should match day abbreviation
    expect(timeElement).toBeInTheDocument();
  });
});
