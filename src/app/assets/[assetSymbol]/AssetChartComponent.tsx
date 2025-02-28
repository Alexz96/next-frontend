'use client';

import { AssetShow } from "@/components/AssetShow";
import { ChartComponent, ChartComponentRef } from "@/components/ChartComponent";
import { Asset } from "@/models";
import { useRef } from "react";

export default function AssetChartComponent(props: { asset: Asset }) {
  const chartRef = useRef<ChartComponentRef>(null);

  return (
    <ChartComponent header={<AssetShow asset={props.asset} />} ref={chartRef} />
  );
}
