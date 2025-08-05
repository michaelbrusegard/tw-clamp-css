import fs from 'fs';

const spacing = {
  0: '0rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  112: '28rem',
  128: '32rem',
  144: '36rem',
  160: '40rem',
  176: '44rem',
  192: '48rem',
  px: '0.0625rem',
  0.5: '0.125rem',
  1.5: '0.375rem',
  2.5: '0.625rem',
  3.5: '0.875rem',
};

const fontsize = {
  xs: ['0.75rem', { lineHeight: '1.33333' }],
  sm: ['0.875rem', { lineHeight: '1.42857' }],
  base: ['1rem', { lineHeight: '1.5' }],
  lg: ['1.125rem', { lineHeight: '1.55555' }],
  xl: ['1.25rem', { lineHeight: '1.4' }],
  '2xl': ['1.5rem', { lineHeight: '1.33333' }],
  '3xl': ['1.875rem', { lineHeight: '1.2' }],
  '4xl': ['2.25rem', { lineHeight: '1.11111' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
};

const breakpoints = {
  '2xs': '24rem',
  xs: '32rem',
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};

function generateClamp(
  minValueRem,
  maxValueRem,
  minBreakpointRem,
  maxBreakpointRem,
) {
  const minSizeRemValue = Number.parseFloat(minValueRem);
  const maxSizeRemValue = Number.parseFloat(maxValueRem);
  const minBreakpointRemValue = Number.parseFloat(minBreakpointRem);
  const maxBreakpointRemValue = Number.parseFloat(maxBreakpointRem);

  const slope =
    (maxSizeRemValue - minSizeRemValue) /
    (maxBreakpointRemValue - minBreakpointRemValue);

  const roundedMinSize = Number(minSizeRemValue.toFixed(3));
  const preferredValue = slope >= 0
    ? `${roundedMinSize}rem + ${slope.toFixed(4)} * (100vw - ${minBreakpointRemValue}rem)`
    : `${roundedMinSize}rem - ${Math.abs(slope).toFixed(4)} * (100vw - ${minBreakpointRemValue}rem)`;

  const minValue = Number(Math.min(minSizeRemValue, maxSizeRemValue).toFixed(3));
  const maxValue = Number(Math.max(minSizeRemValue, maxSizeRemValue).toFixed(3));

  return `clamp(${minValue}rem, calc(${preferredValue}), ${maxValue}rem)`;
}

const header = `/**
 * TailwindCSS v4.0 compatible CSS clamp().
 *
 * @author Michael Brusegard <https://github.com/michaelbrusegard>
 * @license MIT
 */

@theme inline {

  /* Breakpoints */

  --breakpoint-2xs: 24rem;
  --breakpoint-xs: 32rem;

  /* text */
`;

const divider = `
  /* Spacing */
  --spacing-112: 28rem;
  --spacing-128: 32rem;
  --spacing-144: 36rem;
  --spacing-160: 40rem;
  --spacing-176: 44rem;
  --spacing-192: 48rem;`;

const footer = `}\n`;

function generateFontSizeClamps() {
  const lines = [];
  const fontsizeEntries = Object.entries(fontsize);
  const breakpointValues = Object.values(breakpoints);
  const defaultMinBreakpoint = parseFloat(breakpoints.sm);
  const defaultMaxBreakpoint = parseFloat(breakpoints.xl);

  for (let i = 0; i < fontsizeEntries.length; i++) {
    for (let j = 0; j < fontsizeEntries.length; j++) {
      if (i === j) continue;

      const [size1Name, [size1, lineHeight1]] = fontsizeEntries[i];
      const [size2Name, [size2, lineHeight2]] = fontsizeEntries[j];

      const value1 = parseFloat(size1);
      const value2 = parseFloat(size2);

      if (value1 === value2) continue;

      const lineHeight1Value = value1 * parseFloat(lineHeight1.lineHeight);
      const lineHeight2Value = value2 * parseFloat(lineHeight2.lineHeight);

      if (defaultMinBreakpoint !== defaultMaxBreakpoint) {
        const clampValue = generateClamp(
          value1,
          value2,
          defaultMinBreakpoint,
          defaultMaxBreakpoint
        );
        lines.push(`--text-${size1Name}-${size2Name}-clamp: ${clampValue};`);
        const lineHeightClampValue = generateClamp(
          lineHeight1Value,
          lineHeight2Value,
          defaultMinBreakpoint,
          defaultMaxBreakpoint
        );
        lines.push(
          `--text-${size1Name}-${size2Name}-clamp--line-height: ${lineHeightClampValue};`
        );
      }

      for (let k = 0; k < breakpointValues.length; k++) {
        const minBreakpointValue = parseFloat(breakpointValues[k]);

        if (k === breakpointValues.length - 1) {
          break;
        }

        const maxBreakpointValue = parseFloat(breakpointValues[k + 1]);

        if (minBreakpointValue === maxBreakpointValue) continue;

        const clampValue = generateClamp(
          value1,
          value2,
          minBreakpointValue,
          maxBreakpointValue
        );
        const lineHeightClampValue = generateClamp(
          lineHeight1Value,
          lineHeight2Value,
          minBreakpointValue,
          maxBreakpointValue
        );

        const breakpointName = Object.keys(breakpoints)[k];
        const nextBreakpointName = Object.keys(breakpoints)[k + 1];

        lines.push(
          `--text-${size1Name}-${size2Name}-clamp-${breakpointName}-${nextBreakpointName}: ${clampValue};`
        );
        lines.push(
          `--text-${size1Name}-${size2Name}-clamp-${breakpointName}-${nextBreakpointName}--line-height: ${lineHeightClampValue};`
        );
      }
    }
  }

  return lines;
}

function generateSpacingClamps() {
  const lines = [];
  const spacingEntries = Object.entries(spacing);
  const breakpointValues = Object.values(breakpoints);
  const defaultMinBreakpoint = parseFloat(breakpoints.sm);
  const defaultMaxBreakpoint = parseFloat(breakpoints.xl);

  for (let i = 0; i < spacingEntries.length; i++) {
    for (let j = 0; j < spacingEntries.length; j++) {
      if (i === j) continue;

      const [spacing1Name, spacing1] = spacingEntries[i];
      const [spacing2Name, spacing2] = spacingEntries[j];

      const value1 = parseFloat(spacing1);
      const value2 = parseFloat(spacing2);

      if (value1 === value2) continue;

      if (defaultMinBreakpoint !== defaultMaxBreakpoint) {
        const clampValue = generateClamp(
          value1,
          value2,
          defaultMinBreakpoint,
          defaultMaxBreakpoint
        );
        lines.push(
          `--spacing-${spacing1Name}-${spacing2Name}-clamp: ${clampValue};`
        );
      }

      for (let k = 0; k < breakpointValues.length; k++) {
        const minBreakpointValue = parseFloat(breakpointValues[k]);

        if (k === breakpointValues.length - 1) {
          break;
        }

        const maxBreakpointValue = parseFloat(breakpointValues[k + 1]);

        if (minBreakpointValue === maxBreakpointValue) continue;

        const clampValue = generateClamp(
          value1,
          value2,
          minBreakpointValue,
          maxBreakpointValue
        );

        const breakpointName = Object.keys(breakpoints)[k];
        const nextBreakpointName = Object.keys(breakpoints)[k + 1];

        lines.push(
          `--spacing-${spacing1Name}-${spacing2Name}-clamp-${breakpointName}-${nextBreakpointName}: ${clampValue};`
        );
      }
    }
  }

  return lines;
}


const textClamps = generateFontSizeClamps().map(line => '  ' + line);
const spacingClamps = generateSpacingClamps().map(line => '  ' + line);

const content = [
  header,
  ...textClamps,
  divider,
  ...spacingClamps,
  footer
].join('\n');

fs.writeFileSync('./src/static/tw-clamp.css', content, 'utf8');
