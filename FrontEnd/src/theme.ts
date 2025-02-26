import { MantineThemeOverride, Button } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Open Sans, sans-serif',
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '2.5rem',
  },
  components: {
    Button: Button.extend({
      styles: {
        root: { backgroundColor: '#B07D43' },
        label: { color: 'white' },
        inner: { fontSize: 20 },
      },
    }),
  },
};
