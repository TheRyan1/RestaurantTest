import {
    GridCsvExportMenuItem,
    GridPrintExportMenuItem,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
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
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExportContainer {...other}>
                    <GridCsvExportMenuItem options={csvOptions}/>

                    <GridPrintExportMenuItem options={printOptions}/>
                </GridToolbarExportContainer>
            </div>
            <GridToolbarQuickFilter
                options={{showQuickFilter: true}}
                sx={{float: "right"}}
            />
        </div>
    </>
);

export default CustomToolbar;
