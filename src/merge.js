import { mergeConfigs } from 'tailwind-merge';

const fontsizeKeys = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
];
const spacingKeys = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
  '112',
  '128',
  '144',
  '160',
  '176',
  '192',
  'px',
  '0.5',
  '1.5',
  '2.5',
  '3.5',
];
const breakpointKeys = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

function createClampValidator(validValueKeys) {
  return (value) => {
    const parts = value.split('-');

    if (
      parts.length < 3 ||
      !validValueKeys.includes(parts[0]) ||
      !validValueKeys.includes(parts[1]) ||
      parts[2] !== 'clamp'
    ) {
      return false;
    }

    if (parts.length === 3) {
      return true;
    }

    if (
      parts.length === 5 &&
      breakpointKeys.includes(parts[3]) &&
      breakpointKeys.includes(parts[4])
    ) {
      return true;
    }

    return false;
  };
}

const isFontSizeClamp = createClampValidator(fontsizeKeys);
const isSpacingClamp = createClampValidator(spacingKeys);

const spacingGroups = [
  'p',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'm',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'gap',
  'gap-x',
  'gap-y',
  'space-x',
  'space-y',
  'w',
  'h',
  'min-w',
  'min-h',
  'max-w',
  'max-h',
  'inset',
  'inset-x',
  'inset-y',
  'top',
  'right',
  'bottom',
  'left',
];

function withClamp(prevConfig) {
  const spacingGroupExtensions = spacingGroups.reduce((acc, group) => {
    acc[group] = [{ [group]: [isSpacingClamp] }];
    return acc;
  }, {});

  return mergeConfigs(prevConfig, {
    extend: {
      classGroups: {
        'font-size': [{ text: [isFontSizeClamp] }],
        ...spacingGroupExtensions,
      },
    },
  });
}

export { withClamp };
