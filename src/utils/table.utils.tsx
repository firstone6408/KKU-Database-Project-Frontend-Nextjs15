/** @format */

import { TableCell, TableRow } from "@/components/ui/table";

export const tableUtils = {
  tableRowEmpty: function (colSpan?: number) {
    return (
      <TableRow>
        <TableCell
          colSpan={colSpan ?? 0}
          className="text-center font-semibold text-red-600"
        >
          -- ไม่มีรายการ --
        </TableCell>
      </TableRow>
    );
  },
};
