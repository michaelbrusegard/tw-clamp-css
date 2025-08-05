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

export { generateClamp };

