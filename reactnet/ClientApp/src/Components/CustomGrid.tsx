import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";



export default function DataGridDemo({
  columns,
  loading,
  rowData=[],
  Toolbar,
  modalState,
  setModalState,
}: {
  columns: GridColDef[];
  loading: boolean;
  rowData: any;
  Toolbar: any;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DataGrid
      autoHeight
      rows={rowData}
      loading={loading}
      components={{ Toolbar: Toolbar }}
   
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10, 20, 50]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
  );
}
