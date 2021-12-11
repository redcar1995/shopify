import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  Canvas,
  Timing,
  useValue,
  useLoop,
  Timeline,
} from "@shopify/react-native-skia";

import { AnimationElement, AnimationDemo, Size, Padding } from "./Components";

const { width } = Dimensions.get("window");

export const SimpleTimelineAnimation = () => {
  const progress = useValue(0);
  const x = useValue(0);
  const y = useValue(0);
  useLoop(
    progress,
    Timeline.create((tl) => {
      tl.add(Timing.create({ from: 0, to: 1, durationSeconds: 1 }), x);
      tl.add(Timing.create({ from: 0, to: 1, durationSeconds: 0.3 }), y);
      tl.add(Timing.create({ from: 1, to: 0, durationSeconds: 1 }), x);
      tl.add(Timing.create({ from: 1, to: 0, durationSeconds: 0.4 }), y);
    }),
    { yoyo: false }
  );

  return (
    <AnimationDemo
      title={"Simple timeline animation with sequenced animations"}
    >
      <Canvas style={styles.canvas}>
        <AnimationElement
          x={({ width: w }) => x.value * (w - Size)}
          y={({ height: h }) => y.value * (h - Size)}
        />
      </Canvas>
    </AnimationDemo>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 80,
    width: width - Padding,
    backgroundColor: "#FEFEFE",
  },
});
