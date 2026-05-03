import { fireEvent, render, screen } from '@testing-library/react';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('calls onStart when user clicks start journey', () => {
    const onStart = vi.fn();

    render(<LandingPage onStart={onStart} />);

    fireEvent.click(screen.getByRole('button', { name: /start your journey/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
