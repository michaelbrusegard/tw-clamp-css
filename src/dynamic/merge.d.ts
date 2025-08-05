import type { Config } from "tailwind-merge";

export declare function withClamp<
  ClassGroupIds extends string,
  ThemeGroupIds extends string,
>(
  prevConfig: Config<ClassGroupIds, ThemeGroupIds>,
): Config<ClassGroupIds, ThemeGroupIds>;

