export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

const AVERAGE_WORDS_PER_MINUTE = 200;

export function getTextStats(text: string): TextStats {
  const trimmed = text.trim();

  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+|\S+$/g)?.length ?? 0) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words,
    sentences,
    paragraphs,
    readingTimeMinutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / AVERAGE_WORDS_PER_MINUTE)),
  };
}
