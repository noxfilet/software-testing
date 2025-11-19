import get from '../src/get.js';

describe('get (self-designed tests)', () => {
  test('basic nested lookup - product attributes', () => {
    const data = {
      product: {
        details: {
          brand: 'Acme'
        }
      }
    };

    const result = get(data, 'product.details.brand');

    expect(result).toBe('Acme');
  });

  test('array index access - first cart line quantity (with default)', () => {
    const data = {
      cart: {
        lines: [
          { qty: 2 },
          { qty: 1 }
        ]
      }
    };

    // default value is 0, but property exists so we expect the real value
    const result = get(data, 'cart.lines[0].qty', 0);

    expect(result).toBe(2);
  });

  test('path as array segments', () => {
    const data = { a: [{ b: { c: 3 } }] };

    const result = get(data, ['a', '0', 'b', 'c']);

    expect(result).toBe(3);
  });

  test('returns default value when resolved value is undefined', () => {
    const data = {
      flags: {
        beta: undefined
      }
    };

    const result = get(data, 'flags.beta', false);

    expect(result).toBe(false);
  });

  test('returns default value when path does not exist', () => {
    const data = { product: {} };

    const result = get(data, 'product.details.brand', 'Unknown');

    expect(result).toBe('Unknown');
  });

  test('returns default value when object is null or undefined', () => {
    expect(get(null, 'a.b.c', 'fallback')).toBe('fallback');
    expect(get(undefined, 'a.b.c', 'fallback')).toBe('fallback');
  });
});
