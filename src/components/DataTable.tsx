import React, { useState } from 'react';
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}


function DataTable<T>({ data, columns, loading, selectable, onRowSelect }: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    const order = sortKey === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(column.dataIndex);
    setSortOrder(order);
  };

  const handleRowSelect = (row: T) => {
    if (!selectable) return;

    let newSelectedRows: T[] = [];
    if (selectedRows.includes(row)) {
      newSelectedRows = selectedRows.filter(r => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    onRowSelect && onRowSelect(newSelectedRows);
  };

  let sortedData = [...data];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  if (loading) return <div className="p-4">Loading...</div>;
  if (data.length === 0) return <div className="p-4">No data available</div>;

  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2 border">Select</th>}
          {columns.map(col => (
            <th
              key={col.key}
              className="p-2 text-left border cursor-pointer"
              onClick={() => handleSort(col)}
            >
              {col.title} {col.sortable && (sortKey === col.dataIndex ? (sortOrder === 'asc' ? '▲' : '▼') : '')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className={`${selectedRows.includes(row) ? 'bg-blue-100' : ''} hover:bg-gray-50`}
          >
            {selectable && (
              <td className="p-2 border">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="p-2 border">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
