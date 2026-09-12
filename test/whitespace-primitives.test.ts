import { describe, it, expect } from 'vitest';

/**
 * Isolated unit tests for primitive JSON value parsing with leading and trailing whitespace.
 */

function parseSafePrimitive(val: string): unknown {
  if (typeof val !== 'string') return val;
  const trimmed = val.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (trimmed === 'undefined') return undefined;
  if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);
  return val;
}

describe('Whitespace Surrounded Primitive Deserialization', () => {
  it('should parse booleans surrounded by whitespace', () => {
    expect(parseSafePrimitive('   true   ')).toBe(true);
    expect(parseSafePrimitive('\n\tfalse\n')).toBe(false);
  });

  it('should parse null and undefined strings with padding', () => {
    expect(parseSafePrimitive('  null  ')).toBe(null);
    expect(parseSafePrimitive(' undefined ')).toBe(undefined);
  });

  it('should parse numeric literals with padding', () => {
    expect(parseSafePrimitive('  42  ')).toBe(42);
    expect(parseSafePrimitive('  3.1415  ')).toBe(3.1415);
  });
});
