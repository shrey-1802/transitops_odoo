import React from 'react';
import './Table.css';

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
};

export const Table = <T extends unknown>({ columns, data }: { columns: Column<T>[]; data: T[] }) => {
  return (
    <table className="ui-table">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="ui-table-row">
            {columns.map((col, idx) => (
              <td key={idx}>
                {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as any)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
