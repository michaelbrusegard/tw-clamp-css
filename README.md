# `tailwind-clamp-plugin`

> A simple Tailwind CSS plugin for using the CSS `clamp()` function.

```html
<!-- Adjust font size and line height smoothly from md to xl size -->
<div class="clamp-[text-md/xl]">...</div>

<!-- Adjust spacing smoothly using padding, margin or gap -->
<div class="clamp-[px-8/16]">...</div>

<!-- Control breakpoints to adjust between (uses sm to xl if not specified) -->
<div class="clamp-[m-20/40-md/lg]">...</div>

<!-- Only specify one breakpoint to use the default value for the other -->
<div class="clamp-[text-sm/base-/md]">...</div>
```

This was made because I needed a simple solution for [fluid.tw](https://github.com/barvian/fluid-tailwind) in Tailwind CSS v4. barvian's plugin is amazing and has probably a much smoother API than this one, but this is a very simple solution to using clamp that works until it (hopefully) gets natively implemented in Tailwind CSS.

## Installation

Install the plugin from npm:

```sh
npm install -D tailwind-clamp-plugin # Or use another package manager
```

Then add the plugin to your `css` file:

```css
@plugin "tailwind-clamp-plugin";
```

## Documentation

You can clamp the following properties: `text`, `w`, `h`, `max-w`, `max-h`, `min-w`, `min-h`, `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` or `gap`.

Structure: `clamp-[<property>-<value1>/<value2>-<breakpoint1>/<breakpoint2>]`

- The property is the Tailwind property you want to clamp.
- The values use the property's Tailwind values, so you can for example use `sm` for `text`, `8` for `padding` and `margin` etc.
- The breakpoints are the Tailwind breakpoints you want to clamp between. If you only specify one breakpoint, the other will be the default value. The default values are `sm` for breakpoint1 and `xl` for breakpoint2.
- The slash specifies the split between the values and breakpoints that will be clamped between.
