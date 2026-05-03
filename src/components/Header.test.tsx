import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders progress text and triggers reset callback', () => {
    const onReset = vi.fn();

    render(<Header currentStep={3} completedSteps={[1, 2]} onReset={onReset} />);

    expect(screen.getByText(/STEP 3/i)).toBeInTheDocument();
    const resetButton = screen.getByRole('button', { name: /reset all progress/i });
    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
