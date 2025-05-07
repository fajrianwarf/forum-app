import React from 'react';
import { render } from '@testing-library/react';
import { PageLoader } from './PageLoader';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('PageLoader', () => {
  it('renders BlinkBlur loader with primary color', () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: '#3f50b5', // primary color mui
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLoader />
      </ThemeProvider>,
    );

    const loader = container.querySelector('.blink-blur-rli-bounding-box');
    expect(loader).toBeInTheDocument();

    const computedStyle = getComputedStyle(loader);
    expect(computedStyle.getPropertyValue('--shape-phase1-color').trim()).toBe(
      theme.palette.primary.main,
    );
  });
});
