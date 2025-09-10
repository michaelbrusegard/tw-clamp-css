import plugin from "tailwindcss/plugin";
import { generateClamp } from "../utils.js";

const clampPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      clamp: (value) => {
        const parts = value.split("-");
        if (parts.length < 3) {
          return {};
        }

        const isNegative = parts[0] === "";
        if (isNegative) {
          parts.shift();
        }

        const type = parts[0];
        const min = parts[1];
        const max = parts[2];
        const clampIdentifier = parts[3];

        if (clampIdentifier !== "clamp") {
          return {};
        }

        const fontSizes = theme("fontSize");
        const spacing = theme("spacing");
        const breakpoints = theme("screens");

        const minBreakpoint = parts[4] ? breakpoints[parts[4]] : breakpoints.sm;
        const maxBreakpoint = parts[5] ? breakpoints[parts[5]] : breakpoints.xl;

        if (type === "text") {
          const minSize = fontSizes[min][0];
          const maxSize = fontSizes[max][0];
          const minLineHeight = fontSizes[min][1].lineHeight;
          const maxLineHeight = fontSizes[max][1].lineHeight;

          const value1 = parseFloat(minSize);
          const value2 = parseFloat(maxSize);

          const lineHeight1Value = value1 * parseFloat(minLineHeight);
          const lineHeight2Value = value2 * parseFloat(maxLineHeight);

          const clampValue = generateClamp(
            value1,
            value2,
            parseFloat(minBreakpoint),
            parseFloat(maxBreakpoint)
          );

          const lineHeightClampValue = generateClamp(
            lineHeight1Value,
            lineHeight2Value,
            parseFloat(minBreakpoint),
            parseFloat(maxBreakpoint)
          );

          return {
            "font-size": clampValue,
            "line-height": lineHeightClampValue,
          };
        }

        const properties = {
          p: "padding",
          px: "padding-left",
          py: "padding-top",
          pt: "padding-top",
          pr: "padding-right",
          pb: "padding-bottom",
          pl: "padding-left",
          m: "margin",
          mx: "margin-left",
          my: "margin-top",
          mt: "margin-top",
          mr: "margin-right",
          mb: "margin-bottom",
          ml: "margin-left",
          gap: "gap",
          "gap-x": "column-gap",
          "gap-y": "row-gap",
          w: "width",
          h: "height",
          "min-w": "min-width",
          "min-h": "min-height",
          "max-w": "max-width",
          "max-h": "max-height",
          inset: "inset",
          "inset-x": "left",
          "inset-y": "top",
          top: "top",
          right: "right",
          bottom: "bottom",
          left: "left",
          size: "size",
        };

        const property = properties[type];

        if (!property) {
          return {};
        }

        const minSize = spacing[min];
        const maxSize = spacing[max];

        const clampValue = generateClamp(
          parseFloat(minSize),
          parseFloat(maxSize),
          parseFloat(minBreakpoint),
          parseFloat(maxBreakpoint)
        );

        const result = isNegative ? `-${clampValue}` : clampValue;

        if (type === 'size') {
          return {
            width: result,
            height: result,
          };
        }

        if (type === 'px' || type === 'mx' || type === 'inset-x') {
          const secondProperty = type === 'px' ? 'padding-right' : (type === 'mx' ? 'margin-right' : 'right');
          return {
            [property]: result,
            [secondProperty]: result,
          };
        }

        if (type === 'py' || type === 'my' || type === 'inset-y') {
          const secondProperty = type === 'py' ? 'padding-bottom' : (type === 'my' ? 'margin-bottom' : 'bottom');
          return {
            [property]: result,
            [secondProperty]: result,
          };
        }

        return {
          [property]: result,
        };
      },
    }
  );
});

export default clampPlugin;
