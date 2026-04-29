import { create } from 'zustand';

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

const getInitialDark = (): boolean => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyDark = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark);
};

const initial = getInitialDark();
applyDark(initial);

export const useThemeStore = create<ThemeState>((set) => ({
  dark: initial,
  toggle: () =>
    set((state) => {
      const next = !state.dark;
      applyDark(next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return { dark: next };
    }),
}));
