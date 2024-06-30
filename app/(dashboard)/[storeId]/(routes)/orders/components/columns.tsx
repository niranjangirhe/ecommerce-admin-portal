"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import { cn, formatter } from "@/lib/utils";
import Link from "next/link";

interface OrderItemWithProductName {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderColumn = {
  id: string;
  orderItems: OrderItemWithProductName[];
  transactionId: string;
  totalAmount: string;
  isPaid: boolean;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => (
      <Link href={`${window.location.href}/${row.original.id}`}>
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "orderItems",
    header: "Product",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-4">
          {row.original.orderItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <span className="font-semibold font-3 min-w-36">
                {item.name.length > 25
                  ? item.name.slice(0, 25) + "..."
                  : item.name}
              </span>
              <div
                className="
                flex
                gap-4
                text-sm
              "
              >
                <div>
                  <span className="font-semibold">Qty: </span>
                  <span>{item.quantity}</span>
                </div>
                <div>
                  <span className="font-semibold">Price: </span>
                  <span>{formatter.format(item.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <span className="font-semibold justify-center">
        {row.original.totalAmount}
      </span>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <div className="justify-center">{row.original.isPaid ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusBg = {
        Created: "bg-gray-200",
        Processing: "bg-orange-200",
        Shipped: "bg-blue-200",
        Delivered: "bg-green-200",
        Cancelled: "bg-red-200",
      };
      return (
        <div
          className={cn(
            "flex justify-center rounded-full py-1 px-4 text-sm w-fit",
            statusBg[row.original.status as keyof typeof statusBg]
          )}
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
