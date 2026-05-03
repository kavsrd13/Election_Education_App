import { fireEvent, render, screen } from '@testing-library/react';
import { GoogleServicesPanel } from './GoogleServicesPanel';

describe('GoogleServicesPanel', () => {
  it('updates Google Maps search link based on user input', () => {
    render(<GoogleServicesPanel />);

    const input = screen.getByLabelText(/enter locality to search polling booth/i);
    fireEvent.change(input, { target: { value: 'Lucknow' } });

    const mapsLink = screen.getByRole('link', {
      name: /open google maps polling booth search in a new tab/i,
    });

    expect(mapsLink).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('Lucknow'))
    );
  });

  it('renders key Google resource links', () => {
    render(<GoogleServicesPanel />);

    expect(
      screen.getByRole('link', { name: /search voter list help on google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /open youtube search for evm and vvpat learning/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /open google translate with sample civic phrase/i })
    ).toBeInTheDocument();
    expect(screen.getByTitle(/google maps polling booth preview/i)).toBeInTheDocument();
  });
});
