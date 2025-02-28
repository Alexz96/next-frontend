import { Asset, Order, Wallet } from "@/models";

export async function getAssets(): Promise<Asset[]> {
  // recomendado o uso do fetch pois tem melhorias feitas pela Vercel
  const response = await fetch(`http://localhost:3000/assets`);
  return response.json();
}

export async function getMyWallet(walletId: string): Promise<Wallet> {
  // recomendado o uso do fetch pois tem melhorias feitas pela Vercel
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getOrders(walletId: string): Promise<Order[]> {
  // recomendado o uso do fetch pois tem melhorias feitas pela Vercel
  const response = await fetch(
    `http://localhost:3000/orders?walletId=${walletId}`
  );
  return response.json();
}
