import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GlobalChatbot } from './GlobalChatbot';

describe('GlobalChatbot', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends message to backend endpoint and renders model response', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ text: 'You can vote if your name is in the voter list.' }),
    } as Response);

    render(<GlobalChatbot />);

    fireEvent.click(screen.getByRole('button', { name: /toggle chat/i }));
    fireEvent.change(screen.getByLabelText(/ask a question about voting/i), {
      target: { value: 'Who can vote?' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/chat',
        expect.objectContaining({ method: 'POST' })
      );
    });

    expect(
      await screen.findByText(/you can vote if your name is in the voter list/i)
    ).toBeInTheDocument();
  });

  it('shows fallback error message when backend fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as Response);

    render(<GlobalChatbot />);

    fireEvent.click(screen.getByRole('button', { name: /toggle chat/i }));
    fireEvent.change(screen.getByLabelText(/ask a question about voting/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/chat service is temporarily unavailable/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/encountered an error while trying to respond/i)
    ).toBeInTheDocument();
  });
});
