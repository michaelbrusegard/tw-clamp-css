# tw-clamp-css

TailwindCSS v4.0 compatible CSS clamp().

```html
<!-- Adjust font size and line height smoothly from md to xl font size and line height -->
<div class="text-md-xl-clamp">...</div>

<!-- Adjust spacing smoothly using padding, margin or gap -->
<div class="px-8-16-clamp">...</div>

<!-- Control breakpoints the clamp will be between (uses sm to xl if not specified) -->
<div class="m-20-40-clamp-md-lg">...</div>

<!-- Only specify one breakpoint to use the default value for the other -->
<div class="text-sm-base-clamp--md">...</div>
```

Instead of being an old-fashioned JavaScript plugin, this package provides a
generated CSS file defining custom clamp values. The file is very large, but Tailwind will automatically remove unused CSS. This was made because I needed a simple solution for [fluid.tw](https://github.com/barvian/fluid-tailwind) in Tailwind CSS v4. Barvian's plugin is amazing and has probably a much smoother API than this one, but this is a very simple solution to using clamp that works until it (hopefully) gets natively implemented in Tailwind CSS. I also think it is quite simple to understand and use.

## Installation

Install the plugin from npm:

```sh
npm install -D tw-clamp-css # Or use another package manager
```

Then add the following to your `app.css` or `globals.css` file:

```css
@import "tw-clamp-css";
```

## Documentation

You can clamp any text or spacing properties.

Structure: `<property>-<value1>-<value2>-clamp-<breakpoint1>-<breakpoint2>`

- The property is the Tailwind property you want to clamp.
- The values use the property's Tailwind values, so you can for example use `sm` for `text`, `8` for `padding` and `margin` etc.
- The breakpoints are the Tailwind breakpoints you want to clamp between. If you only specify one breakpoint, the other breakpoint will be the default value. The default values are `sm` for breakpoint1 and `xl` for breakpoint2.
- Classes were the values are the same or the breakpoints are the same will not be generated.

There is also extra variants added with the following values and breakpoints:

```css
  /* Breakpoints */
  --breakpoint-2xs: 24rem;
  --breakpoint-xs: 32rem;

  /* Spacing */
  --spacing-112: 28rem;
  --spacing-128: 32rem;
  --spacing-144: 36rem;
  --spacing-160: 40rem;
  --spacing-176: 44rem;
  --spacing-192: 48rem;
```

So you can use larger values for spacing and smaller breakpoints if you want to (You do not have to define these in your own config as they are included in the plugin).

### Tailwind merge

The plugin also has a plugin for tailwind-merge. It can be added like this:

```typescript
import { extendTailwindMerge } from 'tailwind-merge';
import { withClamp } from 'tw-clamp-css/merge';

const twMerge = extendTailwindMerge(withClamp);
```

## References

- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [fluid-tailwind](https://github.com/barvian/fluid-tailwind)
- [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate)
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- [tailwind-clamp](https://github.com/nicolas-cusan/tailwind-clamp)
