import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridToolbarQuickFilter,
  GridPrintExportMenuItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import React from "react";

const CustomToolbar = ({
  csvOptions,
  printOptions,
  ...other
}: {
  csvOptions: any;
  printOptions: any;
}) => (
  <>
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
     
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExportContainer {...other}>
          <GridCsvExportMenuItem options={csvOptions} />

          <GridPrintExportMenuItem options={printOptions} />
        </GridToolbarExportContainer>
      </div>
      <GridToolbarQuickFilter
        options={{ showQuickFilter: true }}
        sx={{ float: "right" }}
      />
    </div>
  </>
);

export default CustomToolbar;
