import { AssetShow } from "@/components/AssetShow";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { OrderTypeBadge } from "@/components/OrderTypeBadge";
import { Order } from "@/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export async function getOrders(walletId: string): Promise<Order[]> {
  // recomendado o uso do fetch pois tem melhorias feitas pela Vercel
  const response = await fetch(
    `http://localhost:3000/orders?walletId=${walletId}`
  );
  return response.json();
}

export default async function OrdersListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;

  const orders = await getOrders(wallet_id);
  console.log("Ordens: ", orders);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minhas ordens</h1>
      </article>
      <div className="overflow-y-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody>
            {orders.map((order, key) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetShow asset={order.asset} />
                </TableCell>
                <TableCell>R$ {order.price}</TableCell>
                <TableCell>{order.shares}</TableCell>
                <TableCell>
                    <OrderTypeBadge type={order.type} />
                </TableCell>
                <TableCell>
                    <OrderStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
