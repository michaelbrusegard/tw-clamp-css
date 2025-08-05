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

This package offers two ways to use CSS `clamp()` functionality in your project: a static CSS file and a dynamic JavaScript plugin.

- **Dynamic Version**: A classic Tailwind plugin that generates clamp utilities on-the-fly. This is the recommended approach as it's more flexible and avoids potential performance problems, but it requires you to surround the class names with `clamp-[]` to use the plugin.
- **Static Version**: A pre-generated CSS file with thousands of utility classes. It's simple to set up but can be very large, which may cause performance issues with the Tailwind CSS language server in some editors.

## Installation

Install the plugin from npm:

```sh
npm install -D tw-clamp-css # Or use another package manager
```

Then add the following at the top of your `app.css` or `globals.css` file:

### Dynamic Version

```css
@plugin "tw-clamp-css/dynamic";
```

### Static Version

```css
@import "tw-clamp-css/static";
```

## Documentation

You can clamp any text or spacing properties.

Structure: `<property>-<value1>-<value2>-clamp-<breakpoint1>-<breakpoint2>`

- The property is the Tailwind property you want to clamp.
- The values use the property's Tailwind values, so you can for example use `sm` for `text`, `8` for `padding` and `margin` etc.
- The breakpoints are the Tailwind breakpoints you want to clamp between. If you only specify one breakpoint, the other breakpoint will be the default value. The default values are `sm` for breakpoint1 and `xl` for breakpoint2.
- Classes were the values are the same or the breakpoints are the same will not be generated.

There is also extra variants added with the following values and breakpoints for the static version:

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

If you are using the dynamic version, you need to add these manually to your CSS file.

### Tailwind merge

The plugin provides helpers for `tailwind-merge` to handle conflicts correctly.

#### For the Dynamic Version

```typescript
import { extendTailwindMerge } from 'tailwind-merge';
import { withClamp } from 'tw-clamp-css/dynamic/merge';

const twMerge = extendTailwindMerge(withClamp);
```

#### For the Static Version

```typescript
import { extendTailwindMerge } from 'tailwind-merge';
import { withClamp } from 'tw-clamp-css/static/merge';

const twMerge = extendTailwindMerge(withClamp);
```

## References

- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [fluid-tailwind](https://github.com/barvian/fluid-tailwind)
- [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate)
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- [tailwind-clamp](https://github.com/nicolas-cusan/tailwind-clamp)
