import { describe, expect, it } from 'vitest';
import { searchTools, getToolById, getAllTags, tools } from './tools';

describe('searchTools', () => {
  it('returns every tool when there is no query or category', () => {
    expect(searchTools('', null)).toHaveLength(tools.length);
  });

  it('filters by name, description or tag, case-insensitively', () => {
    const result = searchTools('CEP', null);
    expect(result.map((tool) => tool.id)).toContain('cep');
  });

  it('filters by category/tag', () => {
    const result = searchTools('', 'finanças');
    expect(result.every((tool) => tool.tags.includes('finanças'))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('combines query and category', () => {
    const result = searchTools('senha', 'segurança');
    expect(result.map((tool) => tool.id)).toEqual(['password-generator']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(searchTools('xyz-does-not-exist', null)).toHaveLength(0);
  });
});

describe('getToolById', () => {
  it('finds an existing tool', () => {
    expect(getToolById('json-formatter')?.id).toBe('json-formatter');
  });

  it('returns undefined for an unknown id', () => {
    expect(getToolById('unknown')).toBeUndefined();
  });
});

describe('getAllTags', () => {
  it('returns a sorted list of unique tags', () => {
    const tags = getAllTags();
    expect(tags).toEqual([...tags].sort());
    expect(new Set(tags).size).toBe(tags.length);
  });
});
