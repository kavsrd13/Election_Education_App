import { MAX_HISTORY_ITEMS, MAX_HISTORY_TEXT_LENGTH, toSafeHistory } from '../../chatSanitizer.js';

describe('chatSanitizer', () => {
  it('returns empty array for non-array input', () => {
    expect(toSafeHistory(null)).toEqual([]);
    expect(toSafeHistory({})).toEqual([]);
  });

  it('keeps only user/model roles and trims blank text', () => {
    const result = toSafeHistory([
      { role: 'user', text: 'hello' },
      { role: 'admin', text: 'ignored' },
      { role: 'model', text: '   ' },
      { role: 'model', text: 'valid response' },
    ]);

    expect(result).toEqual([
      { role: 'user', parts: [{ text: 'hello' }] },
      { role: 'model', parts: [{ text: 'valid response' }] },
    ]);
  });

  it('enforces history length and text length caps', () => {
    const longText = 'x'.repeat(MAX_HISTORY_TEXT_LENGTH + 50);
    const history = Array.from({ length: MAX_HISTORY_ITEMS + 5 }).map((_, i) => ({
      role: i % 2 === 0 ? 'user' : 'model',
      text: longText,
    }));

    const result = toSafeHistory(history);

    expect(result).toHaveLength(MAX_HISTORY_ITEMS);
    expect(result[0].parts[0].text).toHaveLength(MAX_HISTORY_TEXT_LENGTH);
  });
});
