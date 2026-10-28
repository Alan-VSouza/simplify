export interface JsonResult {
  valid: boolean;
  output: string;
  error: string | null;
}

export function formatJson(input: string, indent = 2): JsonResult {
  if (!input.trim()) {
    return { valid: false, output: '', error: null };
  }

  try {
    const parsed = JSON.parse(input);
    return { valid: true, output: JSON.stringify(parsed, null, indent), error: null };
  } catch (err) {
    return {
      valid: false,
      output: '',
      error: err instanceof Error ? err.message : 'JSON inválido.',
    };
  }
}

export function minifyJson(input: string): JsonResult {
  if (!input.trim()) {
    return { valid: false, output: '', error: null };
  }

  try {
    const parsed = JSON.parse(input);
    return { valid: true, output: JSON.stringify(parsed), error: null };
  } catch (err) {
    return {
      valid: false,
      output: '',
      error: err instanceof Error ? err.message : 'JSON inválido.',
    };
  }
}
