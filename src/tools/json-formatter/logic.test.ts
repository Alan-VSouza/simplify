import { describe, expect, it } from 'vitest';
import { formatJson, minifyJson } from './logic';

describe('formatJson', () => {
  it('pretty-prints valid JSON with the given indentation', () => {
    const result = formatJson('{"a":1,"b":2}', 2);
    expect(result.valid).toBe(true);
    expect(result.output).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it('reports an error for invalid JSON', () => {
    const result = formatJson('{a:1}');
    expect(result.valid).toBe(false);
    expect(result.error).not.toBeNull();
  });

  it('treats empty input as neither valid nor an error', () => {
    const result = formatJson('   ');
    expect(result).toEqual({ valid: false, output: '', error: null });
  });
});

describe('minifyJson', () => {
  it('removes whitespace from valid JSON', () => {
    const result = minifyJson('{\n  "a": 1\n}');
    expect(result.output).toBe('{"a":1}');
  });

  it('reports an error for invalid JSON', () => {
    const result = minifyJson('not json');
    expect(result.valid).toBe(false);
  });
});
