import { fireEvent, render, screen } from '@testing-library/react';
import { FaqAssistant } from './FaqAssistant';

describe('FaqAssistant', () => {
  it('toggles faq answer and supports close action', async () => {
    const onClose = vi.fn();

    render(<FaqAssistant isOpen={true} onClose={onClose} />);

    const firstQuestionButton = screen.getByRole('button', {
      name: /who can vote in india/i,
    });

    fireEvent.click(firstQuestionButton);
    expect(await screen.findByText(/any indian citizen/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close faq panel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
