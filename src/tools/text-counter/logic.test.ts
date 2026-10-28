import { describe, expect, it } from 'vitest';
import { getTextStats } from './logic';

describe('getTextStats', () => {
  it('returns all zeros for empty text', () => {
    expect(getTextStats('')).toEqual({
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
    });
  });

  it('counts characters, words and sentences in a simple paragraph', () => {
    const stats = getTextStats('Hello world. How are you?');
    expect(stats.characters).toBe(25);
    expect(stats.words).toBe(5);
    expect(stats.sentences).toBe(2);
    expect(stats.paragraphs).toBe(1);
  });

  it('counts multiple paragraphs separated by blank lines', () => {
    const stats = getTextStats('Primeiro parágrafo.\n\nSegundo parágrafo.');
    expect(stats.paragraphs).toBe(2);
  });

  it('estimates reading time at roughly 200 words per minute', () => {
    const text = Array.from({ length: 400 }, () => 'word').join(' ');
    expect(getTextStats(text).readingTimeMinutes).toBe(2);
  });
});
