import countBy from '../../src/countBy.js';

describe('countBy (self-designed tests)', () => {
  test('counts availability (core function)', () => {
    const products = [
      { inStock: true },
      { inStock: true },
      { inStock: false }
    ];

    const result = countBy(products, p => p.inStock);

    expect(result).toEqual({ true: 2, false: 1 });
  });

  test('category mixed distribution', () => {
    const items = ['shoes', 'shoes', 'bags'];

    expect(countBy(items, s => s)).toEqual({ shoes: 2, bags: 1 });
    expect(countBy(items, s => s.length)).toEqual({5: 2, 4: 1});
  });

  test('price tiering buckets values into low/high', () => {
    const prices = [5, 15, 25, 35];

    const result = countBy(prices, p => (p < 20 ? 'low' : 'high'));

    expect(result).toEqual({ low: 2, high: 2 });
  });

  test('supports object collections as input', () => {
    const regions = { a: 'EU', b: 'US', c: 'EU' };

    const result = countBy(regions, v => v);

    expect(result).toEqual({ EU: 2, US: 1 });
  });

  test('graceful empty input returns empty object', () => {
    const result = countBy([], x => x);

    expect(result).toEqual({});
  });

  test('handles null and undefined as string', () => {
    const result = countBy([null, undefined, null], String);
    expect(result).toEqual({'null' : 2, 'undefined': 1});
  });
  
  test('handles mixed types with String iteratee', () => {
    const result = countBy([1, '1', true], String);
    expect(result).toEqual({ '1': 2, 'true': 1 });
  });
  
});
