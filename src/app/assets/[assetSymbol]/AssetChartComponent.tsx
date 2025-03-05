"use client";

import { AssetShow } from "@/components/AssetShow";
import { ChartComponent, ChartComponentRef } from "@/components/ChartComponent";
import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { Time } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function AssetChartComponent(props: {
  asset: Asset;
  data?: { time: Time; value: number }[];
}) {
  const chartRef = useRef<ChartComponentRef>(null);
  const symbol = props.asset.symbol; // desestruturamos para evitar re-renderizacoes que o useeffect causaria se recebessemos props...

  useEffect(() => {
    socket.connect();
    socket.emit("joinAsset", { symbol });
    socket.on("assets/daily-created", (assetDaily) => {
      console.log("AssetDaily: ", assetDaily);
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price,
      });
    });
  }, [symbol]);

  return (
    <ChartComponent
      header={<AssetShow asset={props.asset} />}
      ref={chartRef}
      data={props.data}
    />
  );
}
