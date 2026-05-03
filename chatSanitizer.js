export const MAX_HISTORY_ITEMS = 12;
export const MAX_HISTORY_TEXT_LENGTH = 1200;

export function toSafeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY_ITEMS)
    .filter((entry) => entry && (entry.role === 'user' || entry.role === 'model'))
    .map((entry) => ({
      role: entry.role,
      text: String(entry.text || '').slice(0, MAX_HISTORY_TEXT_LENGTH),
    }))
    .filter((entry) => entry.text.trim().length > 0)
    .map((entry) => ({
      role: entry.role,
      parts: [{ text: entry.text }],
    }));
}
