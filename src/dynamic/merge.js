import { mergeConfigs } from 'tailwind-merge';

const SPACING_TYPES = [
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
  'gap', 'gap-x', 'gap-y',
  'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h',
  'inset', 'inset-x', 'inset-y', 'top', 'right', 'bottom', 'left',
];

function isClamp(value) {
  const parts = value.split('-');
  const type = parts[0];

  if (parts.length < 4 || parts[3] !== 'clamp') {
    return false;
  }

  if (type === 'text') {
    return true;
  }

  return SPACING_TYPES.includes(type);
};

function withClamp(prevConfig) {
  const classGroups = {
    clamp: [{ clamp: [isClamp] }],
  };

  const conflictingClassGroups = {
    'font-size': ['clamp'],
  };

  SPACING_TYPES.forEach(type => {
    conflictingClassGroups[type] = ['clamp'];
  });

  return mergeConfigs(prevConfig, {
    extend: {
      classGroups,
      conflictingClassGroups,
    },
  });
}

export { withClamp };
