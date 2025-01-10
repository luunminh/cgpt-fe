"use client";
import { ColumnDef, useReactTable } from "@tanstack/react-table";

type Props<TData= any, TValue= any> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


const DataTable = <T = any>({columns}: Props<T>) => {
  const table = useReactTable<T>({
    data,
    columns,

  })
}

export default DataTable;