"use client";

import { AssetShow } from "@/components/AssetShow";
import { WalletAsset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

export default function TableWalletAssetRow(props: {
  walletAsset: WalletAsset;
  walletId: string;
}) {
  const { walletAsset, walletId } = props;

  const assetFound = useAssetStore(
    // ? no formato abaixo, faz renderizar toda a lista de ativos, nao somente o registro necessario
    // state.assets.find((a) => a.symbol === walletAsset.asset.symbol)
    // ? no formato abaixo, eh muito mais performatico, pois so renderiza a linha em questao
    // ? detalhe importante eh que isso ocorre pois sempre geramos um novo array no change do store por causa do principio da imutabilidade
    useShallow((state) =>
      state.assets.find((a) => a.symbol === walletAsset.asset.symbol)
    )
  );

  // ? se tiver no estado pega o ativo de la, senao das props
  const asset = assetFound || walletAsset.asset;

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset} />
      </TableCell>
      <TableCell>R$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset.symbol}?wallet_id=${walletId}`}
        >
          Comprar/vender
        </Button>
      </TableCell>
    </TableRow>
  );
}
