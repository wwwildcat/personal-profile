import mediaQuery from 'css-mediaquery';

export function createMatchMedia(width: number) {
    return (query: string) => ({
        matches: mediaQuery.match(query, { width }),
        media: '',
        onchange: null,
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn()
    });
}