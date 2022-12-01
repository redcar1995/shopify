/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SkiaDomView } from "@shopify/react-native-skia";
import { Group, Canvas, Skia } from "@shopify/react-native-skia";
import React, { useEffect, useRef, useState } from "react";
import { PixelRatio, Platform, Text, View } from "react-native";

import type { SerializedNode } from "./deserialize";
import { parseNode } from "./deserialize";
import { useClient } from "./useClient";

const scale = 3 / PixelRatio.get();
const size = 256 * scale;
// Maximum time to draw: 250 on iOS, 500ms on Android, 1000ms on CI (E2E is availble in separate PR)
//const timeToDraw = E2E ? 1000 : Platform.OS === "ios" ? 250 : 500;
const timeToDraw = Platform.OS === "ios" ? 250 : 500;

interface TestsProps {
  assets: { [key: string]: any };
}

export const Tests = ({ assets }: TestsProps) => {
  const ref = useRef<SkiaDomView>(null);
  const client = useClient();
  const [drawing, setDrawing] = useState<any>(null);
  useEffect(() => {
    if (client !== null) {
      client.onmessage = (e) => {
        const tree: any = JSON.parse(e.data);
        if (tree.code) {
          client.send(
            JSON.stringify(
              // eslint-disable-next-line no-eval
              eval(`(function Main(){const {Skia} = this;${tree.code}})`).call({
                Skia,
              })
            )
          );
        } else {
          const node = parseNode(tree, assets);
          setDrawing(node as SerializedNode);
        }
      };
      return () => {
        client.close();
      };
    }
    return;
  }, [assets, client]);
  useEffect(() => {
    if (drawing) {
      const it = setTimeout(() => {
        const image = ref.current?.makeImageSnapshot();
        if (image && client) {
          const data = image.encodeToBytes();
          client.send(data);
        }
      }, timeToDraw);
      return () => {
        clearTimeout(it);
      };
    }
    return;
  }, [client, drawing]);
  return (
    <View style={{ flex: 1 }}>
      <Text>💚 Waiting for the server to send tests</Text>
      <Canvas style={{ width: size, height: size }} ref={ref}>
        <Group transform={[{ scale }]}>{drawing}</Group>
      </Canvas>
    </View>
  );
};
