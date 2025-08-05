import plugin from "tailwindcss/plugin";

const clampPlugin = plugin(function ({ matchUtilities }) {
  matchUtilities(
    {
      clamp: (value) => {

      },
    }
  );
});

export default clampPlugin;
