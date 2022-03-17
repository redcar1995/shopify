import type { SkiaReadonlyValue } from "../../types";
import type { AnimationParams, SpringConfig } from "../types";
import { useTiming } from "../timing";

import { Spring } from "./Spring";
import { createSpringEasing } from "./functions/spring";

/**
 * Creats a spring based animation value that will run whenever
 * the animation parameters change.
 * @param toOrParams
 * @param config
 * @returns
 */
export const useSpring = (
  toOrParams: number | AnimationParams,
  config?: SpringConfig
): SkiaReadonlyValue<number> =>
  useTiming(toOrParams, createSpringEasing(config ?? Spring.Config.Default));
