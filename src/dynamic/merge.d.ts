import type { Config } from "tailwind-merge";

declare function withClamp(
  prevConfig: Config,
): Config;

export default withClamp;
