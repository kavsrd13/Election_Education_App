import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'scrollTo', {
	value: vi.fn(),
	writable: true,
});

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
	value: vi.fn(),
	writable: true,
});
