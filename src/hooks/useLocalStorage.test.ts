import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts with the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => result.current[1]('updated'));
    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('reads a previously stored value on mount', () => {
    window.localStorage.setItem('key', JSON.stringify(['a', 'b']));
    const { result } = renderHook(() => useLocalStorage<string[]>('key', []));
    expect(result.current[0]).toEqual(['a', 'b']);
  });
});
