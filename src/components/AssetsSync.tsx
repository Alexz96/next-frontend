"use client";

import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { useEffect } from "react";

export default function AssetsSync(props: { assetsSymbols: string[] }) {
  const { assetsSymbols } = props;

  useEffect(() => {
    socket.connect();

    socket.emit("joinAssets", { symbols: assetsSymbols });
    socket.on("assets/price-changed", (asset: Asset) => {
      console.log(asset);
    });

    // na descontrucao do componente, desfaz acoes de inicializacao
    return () => {
      socket.emit("leaveAssets", { symbols: assetsSymbols });
      socket.off("assets/price-changed");
    };
  }, [assetsSymbols]);

  return null;
}
